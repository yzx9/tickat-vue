<template>
  <div class="logo">
    this is a logo.
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AppLogo extends Vue {
    
}
</script>

<style lang="less">
  .logo {
    height: 100px;
    line-height: 100px;
    border: 1px solid greenyellow;
    margin: 10px 20px 20px
  }
</style>

