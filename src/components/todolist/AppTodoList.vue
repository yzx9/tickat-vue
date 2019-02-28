<template>
  <div>
    <el-card
      shadow="hover"
      :class="$style.wrapper"
      :body-style="{ padding:'0px' }"
    >
      <template
        slot="header"
        :body-style="{ padding:'0px' }"
      >
        <TodoListInput
          v-model="newTodoText"
          @submit="onCreate"
        />
      </template>
      <TodoListItems
        :todos="filter"
        :height="listHeight"
        @delete="onDelete"
        @done="onDone"
        @edit="onEdit"
      />
      <TodoListFooter
        v-model="mode"
        :todos="todos"
      />
    </el-card>
    <TodoListDialog
      v-if="dialogVisible"
      :todo="dialogTodo"
      :visible="dialogVisible"
      @submit="handleEdit"
      @close="onEditClose"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Todo from '@/models/Todo'
import TodoListInput from '@/components/todolist/TodoListInput.vue'
import TodoListItems from '@/components/todolist/TodoListItems.vue'
import TodoListFooter, { Mode } from '@/components/todolist/TodoListFooter.vue'
import TodoListDialog from '@/components/todolist/TodoListDialog.vue'

@Component({
  components: {
    TodoListInput,
    TodoListItems,
    TodoListFooter,
    TodoListDialog
  }
})
export default class AppTodoList extends Vue {
  @Prop({ type: String, default: 'auto' }) height!: string
  todos: Todo[] = []
  removeTodoIds: string[] = []
  mode: Mode = Mode.todo
  nextTodoId = 1
  newTodoText = ''
  dialogTodo: Todo | null | undefined = null
  dialogVisible = false
  get listHeight() {
    if (this.height && this.height.toLowerCase() !== 'auto') {
      return `calc(${this.height} - 61px)`
    } else {
      return 'auto'
    }
  }
  get filter() {
    if (!this.todos.length) {
      return null
    }

    let filter: Todo[] = []
    switch (this.mode) {
      case Mode.all:
        filter = this.todos
        break
      case Mode.todo:
        this.todos.map(todo => {
          if (!todo.isDone) {
            filter.push(todo)
          }
        })
        break
      case Mode.completed:
        this.todos.map(todo => {
          if (todo.isDone) {
            filter.push(todo)
          }
        })
        break
      default:
        filter = this.todos
        break
    }
    return filter
  }
  // hooks
  created() {
    this.$http
      .get('/todolist')
      .then(re => {
        re.data.map((todo: Todo) => {
          this.todos.push(todo)
        })
      })
      .catch(e => {
        // TODO: catch error
      })

    // TODO: 假数据
    this.todos.push(
      new Todo((this.nextTodoId++).toString(), '1', new Date(), 'This is first')
    )
    this.todos.push(
      new Todo(
        (this.nextTodoId++).toString(),
        '2',
        new Date(),
        'OMG, what happened to cause I am not the first'
      )
    )
    this.todos.push(
      new Todo(
        (this.nextTodoId++).toString(),
        '3',
        new Date(),
        'Well, I am third'
      )
    )
    for (let i = 0; i < 0; i++) {
      this.todos.push(
        new Todo(
          (this.nextTodoId++).toString(),
          `${i + 4}`,
          new Date(),
          `Well, I am ${i + 4}th`
        )
      )
    }
  }
  // methods
  onCreate() {
    const text = this.newTodoText.trim()
    let todo = new Todo((this.nextTodoId++).toString(), text, new Date())
    this.$http
      .post('/todolist', todo)
      .then(re => {
        if (re.data.type === 0) {
          todo = re.data.data as Todo
        } else {
          // TODO: 创建失败错误处理
        }
      })
      .catch(e => {
        // TODO: 错误
      })
    if (text) {
      this.todos.push(
        new Todo((this.nextTodoId++).toString(), text, new Date())
      )
      this.newTodoText = ''
    }
  }
  onEdit(id: string) {
    this.dialogTodo = this.todos.find(todo => todo.id === id)
    this.dialogVisible = true
  }
  onEditClose() {
    this.dialogVisible = false
  }
  onDone(id: string) {
    this.todos.map(todo => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone
      }
    })
  }
  onDelete(id: string) {
    this.$http
      .delete(`/todolist/${id}`)
      .then(re => {
        let i = -1
        this.todos.map(todo => {
          if (todo.id === id) {
            i = this.todos.indexOf(todo)
            this.removeTodoIds.push(id)
          }
        })
        if (i >= 0) {
          this.todos.splice(i, 1)
        }
      })
      .catch(e => {
        // TODO: catch error
      })

    // TODO: DELETE demo data
    let index = -1
    this.todos.map(todo => {
      if (todo.id === id) {
        index = this.todos.indexOf(todo)
      }
    })
    if (index >= 0) {
      this.todos.splice(index, 1)
    }
  }
  handleEdit(todo: Todo) {
    this.dialogVisible = false
    this.$http
      .put(`/todolist/${todo.id}`, todo)
      .then(re => {
        // TODO
      })
      .catch(e => {
        // TODO
      })

    let i = -1
    this.todos.map(t => {
      if (t.id === todo.id) {
        i = this.todos.indexOf(t)
      }
    })
    if (i >= 0) {
      this.todos[i].title = todo.title
      this.todos[i].content = todo.content
    } else {
      this.todos.push(todo)
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  margin: 20px 10px;
}
</style>
