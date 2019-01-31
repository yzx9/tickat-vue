<template>
  <div>
    <el-row>
      <el-col
        :xl="{ span: 8, offset: 8 }"
        :lg="{ span: 8, offset: 8 }"
        :md="{ span: 12, offset: 6 }"
        :sm="{ span: 12, offset: 6 }"
        :xs="{ span: 20, offset: 2 }"
        class="login-warpper">
        <LoginForm />
        <LoginFooter />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LoginForm from '@/components/LoginForm.vue';
import LoginFooter from '@/components/LoginFooter.vue';

@Component({
  components: {
    LoginForm,
    LoginFooter,
  },
})
export default class AppLogin extends Vue {

}
</script>

<style lang="less">
.login-warpper {
  padding: 36px 30px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 2px 6px -2px rgba(0, 0, 0, 0.1);
}
</style>
