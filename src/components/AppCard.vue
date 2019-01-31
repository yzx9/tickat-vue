<template>
  <el-card
    class="card-warpper"
    :body-style="{ padding: '0px' }"
    shadow="hover">
    <div class="card-content">
      <img
        :src="src"
        class="image" >
    </div>
    <CardFooter :card="card" />
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Card from '@/assets/scripts/Card.ts';
import CardFooter from '@/components/CardFooter.vue';

@Component({
  components: {
    CardFooter,
  }
})
export default class AppCard extends Vue {
  @Prop({ type: Object, required: true })
  card!: Card;
  public publicPath = process.env.BASE_URL;

  public get src() {
    return `${ this.publicPath }${ this.card.image }`;
  }
}
</script>

<style lang="less">
.card-warpper {
  margin: 20px 10px;
  .card-content {
    .image {
      width: 100%;
      display: block;
    }
  }
}
</style>
