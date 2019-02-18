<template>
  <el-card
    :class="$style.wrapper"
    :body-style="{ padding: '0px' }"
    shadow="hover"
  >
    <!-- content -->
    <div :class="$style.content">
      <img :src="src">
    </div>

    <!-- footer -->
    <div :class="$style.footer">
      <span>好吃的汉堡</span>
      <div :class="[$style.bottom, $style.clearfix]">
        <time>{{ card.createTime }}</time>
        <el-button
          type="text"
          :class="$style.button"
        >操作按钮</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Card from '@/models/Card.ts'

@Component({
  components: {}
})
export default class AppCard extends Vue {
  @Prop({ type: Object, required: true })
  public card!: Card
  public publicPath = process.env.BASE_URL

  public get src() {
    return `${this.publicPath}${this.card.image}`
  }
}
</script>

<style lang="scss" module>
.wrapper {
  margin: 20px 10px;
}
.content {
  img {
    width: 100%;
    display: block;
  }
}
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
    &::before &::after {
      display: table;
      content: '';
    }
    &::after {
      clear: both;
    }
  }
}
</style>
