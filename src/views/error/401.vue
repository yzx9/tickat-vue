<template>
  <div :class="$style.wrapper">
    <h1 :class="$style.title">
      <span>404</span> Page Not Found
    </h1>
    <div :class="$style.sub">We couldn't find what you were looking for.</div>
    <div :class="$style.sub">
      <el-button @click="goHome">主页</el-button>
      <el-button @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class NotAuth extends Vue {
  goHome() {
    this.$router.push('/')
  }
  goBack() {
    this.$router.back()
  }
}
</script>

<style lang="scss" module>
.wrapper {
  display: block;
  margin-top: 200px;
  margin-bottom: 130px;
  .title {
    margin: 10px 10px;
  }
  .sub {
    margin: 10px 10px 30px 10px;
  }
}
</style>
