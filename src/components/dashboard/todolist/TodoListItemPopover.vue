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
        @click="onClose"
      >取消</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="submit"
      >确定</el-button>
    </div>
    <slot slot="reference"/>
  </el-popover>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class TodoItemPopover extends Vue {
  visible = false

  submit() {
    this.$emit('submit')
  }
  onClose() {
    this.visible = false
  }
}
</script>

<style lang="scss" module>
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
      color: #409eff;
    }
  }
}
</style>
