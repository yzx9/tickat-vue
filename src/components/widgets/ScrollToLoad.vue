<template>
  <div
    :class="$style.loadMore"
    @click="onClick"
  >
    <div v-if="state===State.wait">
      <i class="el-icon-arrow-down"/>
      <p>下拉加载更多</p>
    </div>
    <div v-if="state===State.scrolling">
      <i class="el-icon-arrow-down"/>
      <p>继续下拉</p>
    </div>
    <div v-if="state===State.scrolled">
      <i class="el-icon-minus"/>
      <p>松开加载更多</p>
    </div>
    <div v-if="state===State.loading">
      <i class="el-icon-loading"/>
      <p>加载中</p>
    </div>
    <div v-if="state===State.loaded">
      <i class="el-icon-check"/>
      <p>加载完成</p>
    </div>
    <div v-if="state===State.loadError">
      <i class="el-icon-close"/>
      <p>加载失败</p>
    </div>
    <div v-if="state===State.noMore">
      <i class="el-icon-close"/>
      <p>暂无更多</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Pager, Order } from '@/models/Pager'

@Component
export default class ScrollToLoad extends Vue {
  @Prop({ type: Object }) private pager!: object
  @Prop({ type: String, required: true }) private url!: string
  private state: State = State.wait

  private onClick() {
    this.Load()
  }
  private Load() {
    // hey, do something here.
    this.$emit('onLoad')
  }
}

export enum State {
  wait,
  scrolling,
  scrolled,
  loading,
  loaded,
  loadError,
  noMore
}
</script>

<style lang="scss" module>
.loadMore {
  padding: 40px 15px 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  p {
    margin-left: 30px;
    color: #63616b;
    display: inline;
  }
  span {
    font-size: 36px;
    &::before {
      color: #63616b !important;
    }
  }
  &-disable {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
}
</style>

