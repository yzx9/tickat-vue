<template>
  <el-card class="todoList"
           :body-style="{ padding:'0px' }"
           shadow="hover">
    <div slot="header"
         :body-style="{ padding:'0px' }">
      <todo-input v-model="newTodoText"
                       :placeholder="placeholder"
                       @submit="handleAdd">
      </todo-input>
    </div>
    <todo-list :todos="todos"
               @delete="handleDelete"
               @done="handleDone">
    </todo-list>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Todo from '@/assets/Todo';
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';

@Component({
  components: {
    TodoInput,
    TodoList,
  },
})
export default class AppTodoList extends Vue {
  nextTodoId = 1;
  newTodoText = '';
  placeholder = 'Todo List';
  removeTodoIds: string[] = [];
  showAlert = false;
  todos: Todo[] = [];

  private created() {
    this.$http
      .get('/todolist')
      .then((re) => {
        re.data.map((todo: Todo)=>{
          this.todos.push(todo);
        })
      })

    // demo数据
    this.todos.push(new Todo(
      (this.nextTodoId++).toString(),
      '1',
      new Date(),
      'This is first'
    ));
    this.todos.push(new Todo(
      (this.nextTodoId++).toString(),
      '2',
      new Date(),
      'OMG, I can\'t what is it happend that i am not first',
    ));
    this.todos.push(new Todo(
      (this.nextTodoId++).toString(),
      '3',
      new Date(),
      'Well, I am third',
    ));
    for(let i = 0; i < 0; i++) {
      this.todos.push(new Todo(
        (this.nextTodoId++).toString(),
        `${i + 4}`,
        new Date(),
        `Well, I am ${i + 4}th`,
      ));
    }
  }
  private handleAdd() {
    console.log(`add:${this.newTodoText}`)
    let text = this.newTodoText.trim();
    let todo = new Todo(
      (this.nextTodoId++).toString(),
      text,
      new Date(),
    );

    this.$http
      .post('/todolist', todo)
      .then((re) => {
        if (re.data.type === 0) {
          todo = re.data.data as Todo;
        } else {
          // 新建失败
        }
      })
      .catch((e) => {
        // 错误
      })
    if (text) {
      this.todos.push(new Todo(
        (this.nextTodoId++).toString(),
        text,
        new Date(),
      ))
      this.newTodoText = '';
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
      this.$http
        .delete(`/todolist/${ id }`)
        .then((re) => {
          if(todo.id === id) {
            this.removeTodoIds.push(id);
          }
        })
        .catch((e) => {
          // 删除失败
        })
    });
  }
}
</script>

<style lang="less" scoped>
.todoList {
  margin: 20px 10px;
}
</style>
