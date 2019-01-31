<template>
  <el-container>
    <el-main>
      <AppLogo
        :height="logo.height"
        :width="logo.width" />
      <AppLogin />
      <TheFooter />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AppLogo from '@/components/AppLogo.vue';
import AppLogin from '@/components/AppLogin.vue';
import TheFooter from '@/components/TheFooter.vue';

@Component({
  components: {
    AppLogo,
    AppLogin,
    TheFooter,
  },
})
export default class Login extends Vue {
  private logo = {
    height: '100px',
    width: '100px',
  };
}
</script>

