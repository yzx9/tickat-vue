<template>
  <div class="todo-footer">
    <span class="todo-count">
      {{ count }} items left
    </span>
    <ul class="todo-filter">
      <li>
        <a :class="{ 'active': m === 'all' }"
           @click="handleChange('all')">全部</a>
      </li>
      <li>
        <a :class="{ 'active': m === 'todo' }"
           @click="handleChange('todo')">待办</a>
      </li>
      <li>
        <a :class="{ 'active': m === 'completed' }"
           @click="handleChange('completed')">完成</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import Todo from '@/assets/Todo';

@Component
export default class TodoFooter extends Vue {
  @Prop({ type: Array, required: true }) private todos !: Todo[];
  @Model( 'change', { type: String, required: true }) private mode !: Mode;
  
  public get count() {
    let c = 0;
    this.todos.map((todo) => {
      c += todo.isDone ? 0 : 1;
    });
    return c;
  }
  private get m() {
    if (this.mode) {
      return this.mode;
    } else {
      return Mode.todo;
    }
  }

  public handleChange(mode: Mode) {
    this.$emit('change', mode);
  }
}

export enum Mode {
  all = 'all',
  todo = 'todo',
  completed = 'completed',
}
</script>

<style lang="less">
  .todo-footer {
    color: #777;
    padding: 10px 15px;
    height: 40px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    .todo-count {
      float: left;
      text-align: left;
    }
    .todo-filter {
      margin: 0;
      padding: 0;
      list-style: none;
      position: absolute;
      right: 0;
      left: 0;
      li {
        display: inline;
        a {
          color: inherit;
          margin: 3px;
          padding: 3px 7px;
          text-decoration: none;
          border: 1px solid transparent;
          border-radius: 3px;
          line-height: 50%;
          cursor: pointer;
          &.active {
            border-color: rgba(175, 47, 47, 0.2);
          }
        }
      }
    }
  }
</style>

