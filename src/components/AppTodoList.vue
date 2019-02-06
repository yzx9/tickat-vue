<template>
  <el-card
    class="todo-list-warpper"
    :body-style="{ padding:'0px' }"
    shadow="hover">
    <div
      slot="header"
      :body-style="{ padding:'0px' }">
      <TodoInput
        v-model="newTodoText"
        :placeholder="placeholder"
        @submit="handleAdd"/>
    </div>
    <TodoList
      :todos="filter"
      @delete="handleDelete"
      @done="handleDone"
      @edit="handleEdit"/>
    <TodoFooter
      :todos="todos"
      v-model="mode"/>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Todo from '@/assets/scripts/Todo';
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';
import TodoFooter, { Mode } from '@/components/TodoFooter.vue';

@Component({
  components: {
    TodoInput,
    TodoList,
    TodoFooter,
  },
})
export default class AppTodoList extends Vue {
  public nextTodoId = 1;
  public newTodoText = '';
  public placeholder = 'Todo List';
  public removeTodoIds: string[] = [];
  public showAlert = false;
  public todos: Todo[] = [];
  public mode: Mode = Mode.todo;
  // hooks
  private created() {
    this.$http
      .get('/todolist')
      .then((re) => {
        re.data.map((todo: Todo ) => {
          this.todos.push(todo);
        });
      });

    // TODO:DELETE demo数据
    this.todos.push(new Todo(
      (this.nextTodoId++).toString(),
      '1',
      new Date(),
      'This is first',
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
    for (let i = 0; i < 0; i++) {
      this.todos.push(new Todo(
        (this.nextTodoId++).toString(),
        `${i + 4}`,
        new Date(),
        `Well, I am ${i + 4}th`,
      ));
    }
  }
  // methods
  private get filter() {
    if (!this.todos.length) { return; }

    let filter: Todo[] = [];
    switch (this.mode) {
      case Mode.all:
        filter = this.todos;
        break;
      case Mode.todo:
        this.todos.map((todo) => {
          if (!todo.isDone) {
            filter.push(todo);
          }
        });
        break;
      case Mode.completed:
        this.todos.map((todo) => {
          if (todo.isDone) {
            filter.push(todo);
          }
        });
        break;
    }
    return filter;
  }
  private handleAdd() {
    const text = this.newTodoText.trim();
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
      });
    if (text) {
      this.todos.push(new Todo(
        (this.nextTodoId++).toString(),
        text,
        new Date(),
      ));
      this.newTodoText = '';
    }
  }
  private handleDone(id: string) {
    this.todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
    });
  }
  private handleDelete(id: string) {
    this.$http
      .delete(`/todolist/${ id }`)
      .then((re) => {
        let index = -1;
        this.todos.map((todo) => {
          if (todo.id === id) {
            index = this.todos.indexOf(todo);
            this.removeTodoIds.push(id);
          }
        });
        if (index >= 0) {
          this.todos.splice(index, 1);
        }
      })
      .catch((e) => {
        // TODO
      });
    
    // demo数据
    let index = -1;
    this.todos.map((todo) => {
      if (todo.id === id) {
        index = this.todos.indexOf(todo);
      }
    });
    if (index >= 0) {
      this.todos.splice(index, 1);
    }
  }
  private handleEdit(todo: Todo) {
    this.$http
      .put(`/todolist/${todo.id}`, todo)
      .then((re) => {
        // TODO
      })
      .catch((e) => {
        // TODO
      });

    let index = -1;
    this.todos.map((t) => {
      if (t.id === todo.id) {
        index = this.todos.indexOf(t);
      }
    });
    if (index >= 0) {
      this.todos[index] = todo;
    } else {
      this.todos.push(todo);
    }
  }
}
</script>

<style lang="less">
.todo-list-warpper {
  margin: 20px 10px;
}
</style>
