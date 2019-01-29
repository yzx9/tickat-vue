<template>
  <el-collapse class="todo-items"
               v-model="activeName"
               @change="handleChange"
               accordion>
      <todo-item v-for="todo in todos"
                 :key="todo.id"
                 :todo="todo"
                 @done="handleDone"
                 @delete="handleDelete">
      </todo-item>
  </el-collapse>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Todo from '@/assets/Todo';
import TodoItem from '@/components/TodoItem.vue';

@Component({
  components: {
    TodoItem,
  }
})
export default class TodoList extends Vue {
  @Prop({ type: Array, required: true }) private todos!: Todo[];
  private activeName : string = '';
  
  private handleChange(id :string) {
    // do something
  }
  private handleDone(id: string) {
    this.$emit('done', id);
  }
  private handleDelete(id: string) {
    this.$emit('delete', id);
  }
}
</script>

<style lang="less">
.todo-items {
  overflow-y: none;
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
</style>
