<template>
  <div class="logo">
    <img alt="logo"
         src="@/assets/icons/logo.png"
         class="pic"
         :style="{ height:hei, width:wid }">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class AppLogo extends Vue {
  @Prop({ type: String, default: '100px' }) private h !: string;
  @Prop({ type: String, default: '100px' }) private w !: string;
  private get hei() {
    if (this.h === undefined) {
      return '100px';
    } else {
      return this.h;
    }
  }
  private get wid() {
    if (this.w === undefined) {
      return '100px';
    } else {
      return this.w;
    }
  }
}
</script>

<style lang="less">
.logo {
  line-height: 100px;
  margin: 10px 20px 20px;
  display:flex;
  align-items:center;
  justify-content:center;
  .pic {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

