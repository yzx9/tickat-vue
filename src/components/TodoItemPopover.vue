<template>
  <el-popover
    v-model="visible"
    placement="top"
    width="160"
    :class="$style.popover"
  >
    <p>确定删除吗？</p>
    <div>
      <el-button
        size="mini"
        type="text"
        @click="handleCancel">
        取消
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="handleOk">
        确定
      </el-button>
    </div>
    <i
      slot="reference"
      class="fa fa-close"
    />
  </el-popover>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class TodoItemPopover extends Vue {
  public visible = false;
  
  public handleCancel() {
    this.visible = false;
  }
  public handleOk() {
    this.$emit('ok');
  }
}
</script>

<style lang="less" module>
.popover {
  & > div {
    text-align: right;
    margin: 0;
  }
  i {
    opacity: 0.8;
    filter: alpha(opacity=100);
    &:hover {
      opacity: 1;
      filter: alpha(opacity=70);
    }
    &.active {
      color: #409EFF;
    }
  }
}
</style>
