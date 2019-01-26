<template>
  <el-row>
    <el-col :span="20"
            :offset="2"
            v-loading="loading">
      <el-form class="form"
               :model="form"
               :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username"
                    placeholder="用户名"
                    prefix-icon="fa fa-user-o"
                    clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password"
                    type="password"
                    placeholder="密码"
                    prefix-icon="fa fa-lock"
                    clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <router-link to="/signup" class="toSignup">
                没有账号？
              </router-link>
            </el-col>
            <el-col :span="12">
              <el-button @click="login" class="btnLogin" type="primary">
                登录
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class LoginForm extends Vue {
  private form = {
    username: '',
    password: '',
  }
  private rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur', },
      { max: 20, message: '长度不大于 20 个字符', trigger: 'blur', },
    ],
    password: [
      { required: true, message: '请输入密码', },
      { max: 20, message: '长度不大于 20 个字符', },
    ],
  }
  private loading: boolean = false;
  
  private login() {
    this.loading = true;
    this.$http.post('/login', {
      username: this.form.username,
      password: this.form.password,
    })
      .then ((data) => {
        this.loading = false;
      })
      .catch ((error) => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  }
}
</script>

<style lang="less">
@linkColor: gray;
.form {
  margin-top: 20px;
  .toSignup {
    float: left;
    text-align: left;
    &:link {
      color: @linkColor;
    }
    &:visited {
      color: @linkColor;
    }
    &:hover {
      color: @linkColor + #111;
    }
  }
  .btnLogin {
    float: right;
    width: 100%
  }
}
</style>
