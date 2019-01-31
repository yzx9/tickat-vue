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
  card!: Card;
}
</script>

<style lang="less">
.card-footer {
  padding: 14px;
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
}
</style>
