<template>
  <el-collapse-item
    :name="todo.id"
    :class="$style.wrapper"
  >
    <template slot="title">
      <i
        :class="[$style.checkbox, { [$style.done]: todo.isDone }]"
        @click.stop="onDone"
      />
      <p :class="$style.title">{{ todo.title }}</p>
    </template>
    <p :class="[$style.content, { [$style.placeholder]: isPlaceholder}]">{{ content }}</p>
    <div :class="$style.btn">
      <i
        v-if="todo.allowEdit"
        :class="['fa fa-edit', $style.icon]"
        @click="onEdit"
      />
      <TodoListItemPopover
        :icon="'fa fa-close'"
        :class="$style.icon"
        @ok="onDelete"
      />
    </div>
  </el-collapse-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Todo from '@/models/Todo'
import TodoListItemPopover from '@/components/todolist/TodoListItemPopover.vue'

@Component({
  components: {
    TodoListItemPopover
  }
})
export default class TodoItem extends Vue {
  @Prop({ type: Object, required: true }) todo!: Todo
  popoverVisible = false

  get content() {
    if (this.todo.content) {
      return this.todo.content
    } else {
      return '添加备注'
    }
  }
  get isPlaceholder() {
    return this.todo.content.trim() === ''
  }

  onDone() {
    this.$emit('done', this.todo.id)
  }
  onDelete() {
    this.popoverVisible = false
    this.$emit('delete', this.todo.id)
  }
  onEdit() {
    this.$emit('edit', this.todo.id)
  }
}
</script>

<style lang="scss" module>
.wrapper {
  .content {
    margin: 10px 45px 10px 30px;
    text-align: left;
    word-wrap: break-word;
    width: calc(100% - 75px);
    &.placeholder {
      color: darkgrey;
    }
  }
  .title {
    border: none;
    outline: none;
    width: 100%;
    font-size: 120%;
    text-align: left;
    padding-left: 10px;
  }
  .btn {
    padding-right: 30px;
    text-align: right;
    font-size: 130%;
    line-height: 50%;
    .icon {
      margin-left: 15px;
      margin-right: 15px;
      opacity: 0.8;
      filter: alpha(opacity=100);
      &:hover {
        opacity: 1;
        filter: alpha(opacity=70);
      }
      &.active {
        color: #409eff;
      }
    }
  }
  .checkbox {
    margin-right: 5px;
    &::after {
      display: block;
      height: 40px;
    }
    &:not(.done)::after {
      content: url('@/assets/icons/todo-checkbox.svg');
    }
    &.done::after {
      content: url('@/assets/icons/todo-checkbox-done.svg');
    }
  }
}
</style>
