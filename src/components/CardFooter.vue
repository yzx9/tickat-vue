<template>
  <div class="card-footer">
    <span>好吃的汉堡</span>
    <div class="bottom clearfix">
      <time class="time">{{ currentDate }}</time>
      <el-button type="text" class="button">操作按钮</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Card from '@/assets/scripts/Card.ts';

@Component
export default class CardFooter extends Vue {
  @Prop({ type: Object, required: true })
  public card!: Card;
  public currentDate = new Date();
}
</script>

<style lang="less">
.card-footer {
  padding: 14px;
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    .time {
      font-size: 13px;
      color: #999;
    }
    .button {
      padding: 0;
      float: right;
    }
  }
  .clearfix {
    &::before
    &::after {
      display: table;
      content: "";
    }
    &::after {
      clear: both;
    }
  }
}
</style>
