<template>
  <div :class="$style.footer">
    <span>好吃的汉堡</span>
    <div :class="[$style.bottom, $style.clearfix]">
      <time>
        {{ currentDate }}
      </time>
      <el-button
        type="text"
        :class="$style.button">
        操作按钮
      </el-button>
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
  public currentDate = new Date().toLocaleString();
}
</script>

<style lang="less" module>
.footer {
  padding: 14px;
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    time {
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
