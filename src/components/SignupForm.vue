<template>
  <el-row>
    <el-col :span="20"
            :offset="2"
            >
      <el-form class="form"
               :model="form"
               :rules="rules"
               ref="form"
               v-loading="loading">
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
        <el-form-item prop="passwordReword">
          <el-input v-model="form.passwordReword"
                    type="password"
                    placeholder="再次输入"
                    prefix-icon="fa fa-lock"
                    clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile"
                    type="tel"
                    placeholder="手机号"
                    prefix-icon="el-icon-mobile-phone"
                    clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="license">
          <el-checkbox class="license" v-model="form.license">
            我已阅读并同意<router-link to="/userLicense">《用户使用协议》</router-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item prop="error"
                      class="formError"
                      :error="formError">
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <router-link to="/login" class="link">
                已有账号？
              </router-link>
            </el-col>
            <el-col :span="12">
              <el-button @click="submit" class="btn" type="primary">
                注册
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
export default class SignupForm extends Vue {
  private form = {
    username: '',
    password: '',
    passwordReword: '',
    mobile: '',
    license: false,
  }
  private rules = {
    username: [
      { max: 20, message: '长度不大于 20 个字符', trigger: 'blur', },
      { validator: this.validateUsername , trigger: 'blur', },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur', },
      { max: 20, message: '长度不大于 20 个字符', trigger: 'blur', },
    ],
    passwordReword: [
      { required: true, validator: this.validatePasswordReword, trigger: 'blur', },
    ],
    mobile: [
      { required: true, validator: this.validateMobile, trigger: 'blur', },
    ],
  }
  private loading = false;
  private formError = '';
  
  private submit(): void {
    (this.$refs['form'] as any).validate((valid: boolean) => {
      if (valid) {
        if (!this.form.license) {
          this.setError('请同意用户使用协议');
          return;
        }
        this.loading = true;
        this.$http.post('/signup', {
          username: this.form.username,
          password: this.form.password,
          mobile: this.form.mobile,
        })
          .then ((data) => {
            this.loading = false;
            this.$router.push('/login');
          })
          .catch ((error) => {
            this.loading = false;
            this.setError('服务器开小差了，请稍后再试');
          });
      }
    })
  }
  private reset(): void {
    (this.$refs['form'] as any).resetFields();
  }
  private validateUsername(rule: object, value: string, callback: (e?: Error) => void): void {
    this.setError();
    if (value === '') {
      callback(new Error('请输入用户名'));
      return;
    }
    // return callback(); // test
    this.$http.post('/signup/validate', {
      username: this.form.username,
    })
      .then((re) => {
        if (re.data.type === 0) {
          callback();
        } else if (re.data.type === 1) {
          callback(new Error('用户名已被占用'));
        } else if (re.data.type === 2) {
          callback(new Error('用户名只能由英文、数字、下划线构成'));
        } else if (re.data.message) {
          callback(new Error(re.data.message));
        } else {
          callback();
        }
      });
  }
  private validatePasswordReword(rule: object, value: string, callback: (e?: Error) => void): void {
    this.setError();
    if (!value) {
      callback(new Error('请再次输入密码'));
    } else if (this.form.password !== value) {
      callback(new Error('两次输入密码不一致'));
    } else {
      callback();
    }
  }
  private validateMobile(rule: object, value: string, callback: (e?: Error) => void): void {
    this.setError();
    const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!value) {
      callback(new Error('请输入手机号'));
    } else if (!phoneReg.test(value)) {
      callback(new Error('请正确输入手机号'));
    } else {
      callback();
    }
  }
  private validateError(rule: object, value: string, callback: (e?: Error) => void) {
    this.setError();
    if (this.formError) {
      callback(new Error(this.formError));
    } else {
      callback();
    }
  }
  public setError(e?: string) {
    console.log(this);
    console.log(e)
    this.formError = e === undefined ? '' : e;
    // (this.$refs['form'] as any).validateField('error');
  }
}
</script>

<style lang="less" scoped>
@linkColor: gray;
.form {
  margin-top: 20px;
  .link {
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
  .btn {
    float: right;
    width: 100%
  }
  .license {
    float: left;
  }
  .formError {
    margin-top: -22px;
    padding-top: 0;
  }
}
</style>
