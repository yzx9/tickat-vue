<template>
  <div :class="$style.wrapper">
    <el-card
      shadow="hover"
      :body-style="bodyStyle"
    >
      <template
        slot="header"
        :body-style="bodyStyle"
      >
        <input
          v-model="newTodoText"
          title="Add New Todo"
          placeholder="Add New Todo"
          :class="$style.input"
          @keydown.enter="onCreate"
        >
      </template>
      <div
        :style="{ height: itemsHeight }"
        :class="$style.items"
      >
        <el-collapse accordion>
          <TodoListItem
            v-for="todo in filter"
            :key="todo.id"
            :todo="todo"
            @delete="onDelete"
            @done="onDone"
            @edit="onEdit"
          />
        </el-collapse>
      </div>
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
import TodoListItem from '@/components/dashboard/todolist/TodoListItem.vue'
import TodoListFooter, {
  Mode
} from '@/components/dashboard/todolist/TodoListFooter.vue'
import TodoListDialog from '@/components/dashboard/todolist/TodoListDialog.vue'

@Component({
  components: {
    TodoListItem,
    TodoListFooter,
    TodoListDialog
  }
})
export default class AppTodoList extends Vue {
  @Prop({ type: String, default: 'auto' }) height!: string
  todos: Todo[] = []
  removeTodoIds: string[] = []
  mode: Mode = Mode.todo
  bodyStyle = {
    padding: '0px'
  }
  // new Todo
  nextTodoId = 1
  newTodoText = ''
  // dialog
  dialogTodo: Todo | null | undefined = null
  dialogVisible = false
  get itemsHeight() {
    if (this.height && this.height.toLowerCase() !== 'auto') {
      return `calc(${this.height} - 104px)`
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
  .input {
    border: none;
    outline: none;
    width: calc(100% - 40px);
    height: 100%;
    font-size: 130%;
    border-bottom-style: solid;
    border-bottom-width: thin;
    border-bottom-color: gray;
    border-bottom: 1px solid #e6e6e6;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    margin-left: 20px;
    margin-right: 20px;
  }
  .items {
    overflow-y: auto;
    // 滚动条样式
    &::-webkit-scrollbar {
      // 滚动条整体样式
      // 高宽分别对应横竖滚动条的尺寸
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      // 滚动条里面小方块
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-track {
      // 滚动条里面轨道
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
