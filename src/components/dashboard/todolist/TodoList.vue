<template>
  <div :class="$style.wrapper">
    <el-card shadow="hover" :body-style="bodyStyle">
      <template slot="header" :body-style="bodyStyle">
        <input
          v-model="newTodoText"
          title="Add New Todo"
          placeholder="Add New Todo"
          :class="$style.input"
          @keydown.enter="onCreate"
        />
      </template>
      <div :style="{ height: itemsHeight }" :class="$style.items">
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
      <TodoListFooter v-model="mode" :todos="todos" />
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
    return this.height && this.height.toLowerCase() !== 'auto'
      ? `calc(${this.height} - 104px)`
      : 'auto'
  }

  get filter() {
    if (!this.todos.length) return null

    switch (this.mode) {
      case Mode.todo:
        return this.todos.filter(todo => !todo.isDone)
      case Mode.completed:
        return this.todos.filter(todo => todo.isDone)
      case Mode.all:
      default:
        return this.todos
    }
  }

  // hooks
  async created() {
    try {
      const re = await this.$http.get('/todolist')
      this.todos.push(...(re.data as Todo[]))
    } catch (e) {
      // TODO: mock
      const todos = [
        new Todo(
          (this.nextTodoId++).toString(),
          '早上吃什么呢',
          new Date(),
          'This is first'
        ),
        new Todo(
          (this.nextTodoId++).toString(),
          '中午吃什么呢',
          new Date(),
          'OMG, what happened to cause I am not the first'
        ),
        new Todo(
          (this.nextTodoId++).toString(),
          '晚上吃什么呢',
          new Date(),
          'Well, I am third'
        )
      ]
      const mock = (i: number, id: number) =>
        new Todo(id.toString(), `todo ${i}`, new Date(), `Well, I am ${i}th`)

      for (let i = 0; i < 3; i++) {
        this.todos.push(todos[i] || mock(i, this.nextTodoId++))
      }
    }
  }

  // methods
  async onCreate() {
    const text = this.newTodoText.trim()
    const todo = new Todo((this.nextTodoId++).toString(), text, new Date())

    if (!text) return
    this.todos.push(todo)
    this.newTodoText = ''

    try {
      const { data } = await this.$http.post('/todolist', todo)
      todo.id = (data as Todo).id
    } catch {
      // TODO
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
    const todo = this.todos.find(a => a.id === id)
    if (todo) todo.isDone = !todo.isDone
  }

  async onDelete(id: string) {
    this.$http.delete(`/todolist/${id}`).then(re => {
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

    // TODO mock
    const index = this.todos.findIndex(a => a.id === id)
    if (index >= 0) {
      this.todos.splice(index, 1)
    }
  }

  handleEdit(todo: Todo) {
    this.dialogVisible = false
    this.$http.put(`/todolist/${todo.id}`, todo).then(re => {
      // TODO
    })

    const i = this.todos.findIndex(t => t.id === todo.id)
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
    box-sizing: border-box;
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
