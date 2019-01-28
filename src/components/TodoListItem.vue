<template>
  <transition>
    <el-row class="todoItem" @click.native="handleClick">
      <el-col :class="{ 'doneItem': todo.isDone, 'txt': true }"
              :span="24">
        <i :class="{ 'fa fa-circle-o': !todo.isDone,
                      'fa fa-check-circle-o':todo.isDone,
                      'icon': true }"
            @click="handleDone">
        </i>{{ todo.title }}
      </el-col>
      <!--<el-col class="btn" :span="4">
        <i class="el-icon-delete" @click="handleDelete"></i>
        <el-button :class="{ 'el-button--success': !todo.isDone }"
                    @click="done"
                    icon="el-icon-check"
                    size="medium"
                    circle>
        </el-button>
        <el-button :class="{ 'el-button--danger': !todo.isDone }"
                    @click="handleDelete"
                    icon="el-icon-delete"
                    size="medium"
                    circle>
        </el-button>-->
      </el-col>
    </el-row>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TodoItem from '@/assets/TodoItem';

@Component
export default class TodoListItem extends Vue {
  @Prop({ type: Object, required: true }) private todo!: TodoItem;
  
  private handleClick() {
    console.log(`click:${this.todo.id}`);
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
  margin: 1px 1px;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(250, 250, 250, 1);
  .txt {
    text-align: left;
  }
  .icon {
    margin-right: 5px;
    z-index: 1;
  }
  .btn {
    color: red;
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
