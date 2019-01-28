<template>
  <div class="todoList">
    <todo-list-input v-model="newTodoText"
                     @addTodo="handleAdd"
                     class="todoInput">
    </todo-list-input>
    <div v-if="todos.length" class="todoItems">
      <div v-for="todo in todos" :key="todo.id">
        <todo-list-item :todo="todo"
                        v-if="!todo.isDone"
                        @delete="handleDelete"
                        @done="handleDone"
                        class="todoItem">
        </todo-list-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TodoItem from '@/assets/TodoItem';
import TodoListInput from '@/components/TodoListInput.vue';
import TodoListItem from '@/components/TodoListItem.vue';

@Component({
  components: {
    TodoListInput,
    TodoListItem,
  },
})
export default class AppTodoList extends Vue {
  nextTodoId = 1;
  newTodoText = '';
  removeTodoIds: string[] = [];
  showAlert = false;
  todos: TodoItem[] = [];

  private created() {
    this.$http
      .get('/todolist')
      .then((re) => {
        re.data.map((todo: TodoItem)=>{
          this.todos.push(todo);
        })
      })

    // demo数据
    this.todos.push(new TodoItem(
      (this.nextTodoId++).toString(),
      'This is first',
      '',
      new Date(),
      true,
      false
    ));
    this.todos.push(new TodoItem(
      (this.nextTodoId++).toString(),
      'OMG, I can\'t what is it happend',
      '',
      new Date(),
      true,
      false
    ));
    this.todos.push(new TodoItem(
      (this.nextTodoId++).toString(),
      'Well, I am third',
      '',
      new Date(),
      true,
      false
    ));
    for(let i = 0; i < 10; i++) {
      this.todos.push(new TodoItem(
        (this.nextTodoId++).toString(),
        `Well, I am ${i + 4}th`,
        '',
        new Date(),
        true,
        false
      ));
    }
  }
  private handleAdd() {
    let text = this.newTodoText.trim();
    if (text) {
      this.todos.push({
        id: (this.nextTodoId++).toString(),
        text: text,
        isDone: false,
        isStar: false,
        isRemove: false,
      })
      this.newTodoText = ''
    }
  }
  private handleDone(id: string) {
    this.todos.map((todo) => {
      if(todo.id === id) {
        todo.isDone = !todo.isDone;
      }
    });
  }
  private handleDelete(id: string) {
    this.todos.map((todo) => {
      if(todo.id === id) {
        this.removeTodoIds.push(id);
        todo.isRemove = !todo.isRemove;
      }
    });
  }
}
</script>

<style lang="less" scoped>
.todoList {
  margin: 20px 10px;
  background-color: rgba(170, 170, 170, 0.5);
  border-radius: 5px;
  .todoItems {
    height: calc(100% - 40px);
    overflow: hidden;
    overflow-y: auto;
    /*滚动条样式*/
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      /*高宽分别对应横竖滚动条的尺寸*/
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
    }
  }
}
</style>
