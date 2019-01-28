<template>
  <div class="flex">
    <div class="center">
      <input-new-todo
          v-model="newTodoText"
          @addTodo="addTodo"
          style="width:600px">
      </input-new-todo>
    </div>
    <table class="center"
           style="margin: 30px; width:550px"
           v-if="todos.length">
      <tbody>
        <todo-list-item v-for="todo in todos"
                        :key="todo.id"
                        :todo="todo"
                        @remove="removeTodo"
                        @done="doneTodo"
                        @star="starTodo"/>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TodoListInput from '@/components/TodoListInput.vue'
import TodoListItem from '@/components/TodoListItem.vue'

@Component({
  components: {
    TodoListInput,
    TodoListItem,
  }
})
export default class AppTodoList extends Vue {
  nextTodoId = 1;
  newTodoText = '';
  removeTodoIds: Array<string> = [];
  showAlert = false;
  todos = [{
    id: (this.nextTodoId++).toString(),
    text: 'This is first',
    isDone: false,
    isStar: false,
    isRemove: false,
  },
  {
    id: (this.nextTodoId++).toString(),
    text: "OMG, I can't what is it happend",
    isDone: false,
    isStar: false,
    isRemove: false,
  },
  {
    id: (this.nextTodoId++).toString(),
    text: 'Well, I am third',
    isDone: false,
    isStar: false,
    isRemove: false,
  }]
  private addTodo() {
    let text = this.newTodoText.trim();
    if(text) {
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
  private doneTodo(id: string) {
    this.todos.map((todo) => {
      if(todo.id === id) {
        todo.isDone = !todo.isDone;
      }
    });
  }
  private starTodo(id: string) {
    this.todos.map((todo) => {
      if(todo.id === id) {
        todo.isStar = !todo.isStar;
      }
    });
  }
  private removeTodo(id: string) {
    this.todos.map((todo) => {
      if(todo.id === id) {
        this.removeTodoIds.push(id);
        todo.isRemove = !todo.isRemove;
      }
    });
  }
}
</script>

<style>
.flex {
  display: flex;
  flex-direction: column;
}
.center {
  align-self: center;
}
</style>
