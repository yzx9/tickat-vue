<template>
  <transition name="el-fade-in">
    <tr v-if="!todo.isRemove">
      <td :class="textClassObject">
        {{ todo.text }}
      </td>
      <td style="width: 30px"></td>
      <td width="38px">
        <el-button :class="{ 'el-button--success': !todo.isDone }"
                   @click="$emit('done', todo.id)"
                   icon="el-icon-check"
                   size="medium"
                   circle>
        </el-button>
      </td>
      <td width="38px">
        <el-button :class="{ 'el-button--danger': !todo.isDone }"
                   @click="$emit('remove', todo.id)"
                   icon="el-icon-delete"
                   size="medium"
                   circle>
        </el-button>
      </td>
    </tr>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TodoItem from '@/assets/TodoItem';

@Component
export default class TodoListItem extends Vue {
  @Prop({ type: Object, required: true }) private todo!: TodoItem;
  private get textClassObject() {
    return {
      showItem: true,
      doneItem: this.todo.isDone,
    }
  }
}
</script>

<style lang="less">
.showItem {
  font-size: 20px;
}
.doneItem {
  color: #909399;
  text-decoration:line-through;
}
.starItem {
  color: #E6A23C;
  font-weight:bold;
}
</style>
