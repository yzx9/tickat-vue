<template>
  <el-container>
    <el-main>
      <app-logo :h="logo.height" :w="logo.width"></app-logo>
      <app-signup></app-signup>
      <app-footer></app-footer>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AppLogo from '@/components/AppLogo.vue';
import AppSignup from '@/components/AppSignup.vue';
import AppFooter from '@/components/AppFooter.vue';

@Component({
  components: {
    AppLogo,
    AppSignup,
    AppFooter,
  },
})
export default class Signup extends Vue {
  private logo = {
    height: '100px',
    width: '100px',
  };
}
</script>
