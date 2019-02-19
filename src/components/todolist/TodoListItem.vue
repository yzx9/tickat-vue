<template>
  <el-collapse-item
    :name="todo.id"
    :class="$style.wrapper"
  >
    <template slot="title">
      <i
        :class="[$style.checkbox, { [$style.done]: todo.isDone }]"
        @click.stop="handleDone"
      />
      <input
        v-model="todo.title"
        :class="$style.title"
        :readonly="!canEdit"
      >
    </template>
    <EditDiv
      v-model="todo.content"
      :canEdit="canEdit"
      :class="$style.content"
    />
    <div :class="$style.btn">
      <i
        v-if="todo.allowEdit"
        :class="['fa fa-edit', $style.icon, { [$style.active]: canEdit }]"
        @click="handleEdit"
      />
      <TodoListItemPopover
        :icon="'fa fa-close'"
        :class="$style.icon"
        @ok="handleDelete"
      />
    </div>
  </el-collapse-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Todo from '@/models/Todo'
import EditDiv from '@/components/widgets/EditDiv.vue'
import TodoListItemPopover from '@/components/todolist/TodoListItemPopover.vue'

@Component({
  components: {
    EditDiv,
    TodoListItemPopover
  }
})
export default class TodoItem extends Vue {
  @Prop({ type: Object, required: true }) todo!: Todo
  visible = false
  canEdit = false

  handleDone() {
    this.$emit('done', this.todo.id)
  }
  handleDelete() {
    this.visible = false
    this.$emit('delete', this.todo.id)
  }
  handleEdit() {
    this.canEdit = !this.canEdit
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
  }
  .title {
    border: none;
    outline: none;
    width: 100%;
    font-size: 120%;
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
      content: url('../../assets/icons/todo-checkbox.svg');
    }
    &.done::after {
      content: url('../../assets/icons/todo-checkbox-done.svg');
    }
  }
}
</style>
