<template>
  <el-collapse-item
    :name="todo.id"
    class="todo-item-warpper">
    <template slot="title">
      <i
        :class="['todo-checkbox', { 'done': todo.isDone }]"
        @click.stop="handleDone"/>
      <input
        v-model="todo.title"
        class="todo-item-title"
        :readonly="!canEdit">
    </template>
    <EditDiv
      :canEdit="canEdit"
      v-model="todo.content"
      class="todo-item-content"/>
    <div class="todo-item-btn">
      <i
        v-if="todo.allowEdit"
        :class="['fa fa-edit icon', { 'active': canEdit }]"
        @click="handleEdit"/>
      <el-popover
        placement="top"
        width="160"
        v-model="visible">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button
            size="mini"
            type="text"
            @click="visible=false">
            取消
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleDelete">
            确定
          </el-button>
        </div>
        <a
          slot="reference"
          class="fa fa-close todo-icon"/>
      </el-popover>
    </div>
  </el-collapse-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Todo from '@/assets/scripts/Todo';
import EditDiv from '@/components/EditDiv.vue';

@Component({
  components: {
    EditDiv,
  },
})
export default class TodoItem extends Vue {
  @Prop({ type: Object, required: true })
  public todo!: Todo;
  private visible = false;
  private canEdit = false;
  
  private handleDone() {
    this.$emit('done', this.todo.id);
  }
  private handleDelete() {
    this.visible = false;
    this.$emit('delete', this.todo.id);
  }
  private handleEdit() {
    this.canEdit = !this.canEdit;
  }
}
</script>

<style lang="less">
.todo-item-warpper {
  .todo-item-content {
    margin: 10px 45px 10px 30px;
    text-align: left;
    word-wrap: break-word;
    width: calc(100% - 75px);
  }
  .todo-item-title {
    border: none;
    outline: none;
    width: 100%;
    font-size: 120%;
  }
  .todo-item-btn {
    padding-right: 30px;
    text-align: right;
    font-size: 130%;
    line-height: 50%;
    .todo-icon {
      margin-left: 15px;
      margin-right: 15px;
      opacity:0.8;
      filter:alpha(opacity=100);
      &:hover {
        opacity:1;
        filter:alpha(opacity=70);
      }
      &.active {
        color: #409EFF;
      }
    }
  }
  .todo-checkbox {
    margin-right: 5px;
    &::after {
      display: block;
      height: 40px;
    }
    &:not(.done)::after {
      content: url('../assets/icons/todo-checkbox.svg');
    }
    &.done::after {
      content: url('../assets/icons/todo-checkbox-done.svg');
    }
  }
}
</style>
