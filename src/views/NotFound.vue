<template>
  <div class="center">
    <p>404 Not Found</p>
    <el-button @click="goHome">主页</el-button>
    <el-button @click="goBack">返回</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {
  public goHome() {
    this.$router.push('/');
  }
  public goBack() {
    this.$router.back();
  }
}
</script>

<style lang="less">
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
}
</style>
