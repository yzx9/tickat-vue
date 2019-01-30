<template>
  <el-menu :default-active="activeIndex"
           class="nav-wrapper"
           mode="horizontal"
           @select="handleSelect"
           router>
    <el-menu-item index="home" style="display: inline;">
      <app-logo :h="'36px'" :w="'36px'"></app-logo>
    </el-menu-item>
    <el-menu-item index="square">广场</el-menu-item>
    <el-menu-item index="group">圈子</el-menu-item>
    <el-menu-item index="user" class="nav-account">
      <a href="#" class="sh-section__avatar avatar">
        <img :src="avatar" alt="">
      </a>
    </el-menu-item>
    <el-menu-item index="message" class="nav-account">
      <i class="el-icon-bell"></i>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppLogo from '@/components/AppLogo.vue';

@Component({
  components: {
    AppLogo,
  },
})
export default class AppNav extends Vue {
  public avatar = 'images/avatars/avatar-11.png';
  public activeIndex!: string;

  public handleSelect(active: string) {
    
  }
}
</script>

<style lang="less">
.nav-wrapper {
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
  .nav-account {
    float: right !important;
  }
}
</style>
