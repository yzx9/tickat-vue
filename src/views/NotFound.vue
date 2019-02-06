<template>
  <el-container :class="$style.app">
    <el-header :class="$style.header">
      <TheNav/>
    </el-header>
    <el-main>
      <div :class="$style.center">
        <div>
          <p>404 Not Found</p>
          <div>
            <el-button @click="goHome">主页</el-button>
            <el-button @click="goBack">返回</el-button>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer>
      <TheFooter/>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheNav from '@/components/TheNav.vue';
import TheFooter from '@/components/TheFooter.vue';

@Component({
  components: {
    TheNav,
    TheFooter,
  },
})
export default class NotFound extends Vue {
  public goHome() {
    this.$router.push('/');
  }
  public goBack() {
    this.$router.back();
  }
}
</script>

<style lang="less" module>
.app {
  .header {
    padding: 0px;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    width: 100%;
    & > div {
      display: block;
      p {
        margin: 10px 10px;
      }
    }
  }
}
</style>
