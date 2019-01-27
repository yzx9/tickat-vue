<template>
  <el-container>
    <el-main>
      <app-logo :h="logo.height" :w="logo.width"></app-logo>
      <app-login></app-login>
      <app-footer></app-footer>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AppLogo from '@/components/AppLogo.vue';
import AppLogin from '@/components/AppLogin.vue';
import AppFooter from '@/components/AppFooter.vue';

@Component({
  components: {
    AppLogo,
    AppLogin,
    AppFooter,
  },
})
export default class Login extends Vue {
  private logo = {
    height: '100px',
    width: '100px',
  };
}
</script>

