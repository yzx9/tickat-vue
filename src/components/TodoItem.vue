<template>
  <el-collapse-item :name="todo.id"
                    class="todoItem">
    <template slot="title">
        <i :class="{ 'icon': !todo.isDone, 'icon-done': todo.isDone}"
          @click.stop="handleDone">
        </i>{{ todo.title }}
    </template>
    <div class="txt">
      {{ todo.content }}
    </div>
  </el-collapse-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Todo from '@/assets/Todo';

@Component
export default class TodoItem extends Vue {
  @Prop({ type: Object, required: true }) private todo!: Todo;
  
  private handleChange() {
    console.log(`change:${this.todo.id}`);
  }
  private handleDone() {
    this.$emit('done', this.todo.id);
  }
  private handleDelete() {
    this.$emit('delete', this.todo.id);
  }
}
</script>

<style lang="less" scoped>
.todoItem {
  .txt {
    padding-left: 20px;
    text-align: left;
  }
  .icon {
    margin-right: 5px;
    &::after {
      display: block;
      height: 40px;
      content: url('../assets/todo-checkbox.svg');
    }
  }
  .icon-done {
    margin-right: 5px;
    &::after {
      display: block;
      height: 40px;
      content: url('../assets/todo-checkbox-done.svg');
    }
  }
  .doneItem {
    color: #909399;
    text-decoration:line-through;
  }
  .starItem {
    color: #E6A23C;
    font-weight:bold;
  }
}
</style>
