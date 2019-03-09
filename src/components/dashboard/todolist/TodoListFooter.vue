<template>
  <div :class="$style.footer">
    <span :class="[$style.count, 'hidden-sm-and-down']">Todo: {{ count }}</span>
    <ul :class="$style.filter">
      <li>
        <a
          :class="{ [$style.active]: isAll }"
          @click="onChange('all')"
        >全部</a>
      </li>
      <li>
        <a
          :class="{ [$style.active]: isTodo }"
          @click="onChange('todo')"
        >待办</a>
      </li>
      <li>
        <a
          :class="{ [$style.active]: isCompleted }"
          @click="onChange('completed')"
        >完成</a>
      </li>
    </ul>
    <span :class="[$style['flex-helper'], 'hidden-sm-and-down']">Todo:{{ count }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'
import Todo from '@/models/Todo'
import 'element-ui/lib/theme-chalk/display.css'

@Component
export default class TodoFooter extends Vue {
  @Prop({ type: Array, required: true }) todos!: Todo[]
  @Model('change', { type: String, required: true }) mode!: Mode

  get count() {
    let c = 0
    this.todos.map(todo => {
      c += todo.isDone ? 0 : 1
    })
    return c
  }
  get isAll() {
    return this.mode === Mode.all
  }
  get isTodo() {
    return this.mode === Mode.todo
  }
  get isCompleted() {
    return this.mode === Mode.completed
  }

  onChange(mode: Mode) {
    this.$emit('change', mode)
  }
}

export enum Mode {
  all = 'all',
  todo = 'todo',
  completed = 'completed'
}
</script>

<style lang="scss" module>
.footer {
  color: #777;
  padding: 10px 15px;
  height: 40px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .count {
    text-align: left;
  }
  .filter {
    list-style: none;
    li {
      display: inline;
      a {
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
  .flex-helper {
    // 帮助类，用于居中对齐
    visibility: hidden;
  }
}
</style>

