<template>
  <el-row>
    <el-col
      :xl="{ span: 16, offset: 4 }"
      :lg="{ span: 20, offset: 2 }"
      :md="{ span: 20, offset: 2 }"
      :sm="{ span: 24, offset: 0 }"
      :xs="{ span: 24, offset: 0 }"
    >
      <el-form
        ref="form"
        :class="$style.form"
        :model="form"
        :rules="rules"
        v-loading="loading"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            prefix-icon="fa fa-user-o"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            prefix-icon="fa fa-lock"
            clearable
          />
        </el-form-item>
        <el-form-item prop="passwordReword">
          <el-input
            v-model="form.passwordReword"
            type="password"
            placeholder="再次输入"
            prefix-icon="fa fa-lock"
            clearable
          />
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input
            v-model="form.mobile"
            type="tel"
            placeholder="手机号"
            prefix-icon="el-icon-mobile-phone"
            clearable
          />
        </el-form-item>
        <el-form-item prop="license">
          <el-checkbox
            :class="$style.license"
            v-model="form.license"
          >我已阅读并同意
            <router-link to="/userLicense">《用户使用协议》</router-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item
          prop="error"
          :class="$style.formError"
          :error="formError"
        ></el-form-item>
        <el-form-item>
          <el-row :class="$style.option">
            <el-col :span="12">
              <el-button
                type="text"
                @click="redirectHandle"
              >已有账号？</el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                type="primary"
                :class="$style.btn"
                @click="submit"
              >注册</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Model, Prop } from 'vue-property-decorator'

@Component
export default class SignupForm extends Vue {
  @Model('change')
  formError!: string
  @Prop({ type: Boolean, default: false })
  loading!: boolean
  form = {
    username: '',
    password: '',
    passwordReword: '',
    mobile: '',
    license: false
  }
  rules = {
    username: [
      { max: 20, message: '长度不大于 20 个字符', trigger: 'blur' },
      { validator: this.validateUsername, trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { max: 20, message: '长度不大于 20 个字符', trigger: 'blur' }
    ],
    passwordReword: [
      {
        required: true,
        validator: this.validatePasswordReword,
        trigger: 'blur'
      }
    ],
    mobile: [
      { required: true, validator: this.validateMobile, trigger: 'blur' }
    ]
  }

  setError(e?: string) {
    this.$emit('change', e)
  }
  submit(): void {
    const form = 'form'
    ;(this.$refs[form] as any).validate((valid: boolean) => {
      if (valid) {
        if (!this.form.license) {
          this.setError('请同意用户使用协议')
          return null
        }
        this.$emit('submit', this.form)
      }
    })
  }
  reset(): void {
    const form = 'form'
    ;(this.$refs[form] as any).resetFields()
  }
  validateUsername(rule: object, value: string, callback: (e?: Error) => void) {
    this.setError()
    if (value === '') {
      return callback(new Error('请输入用户名'))
    }
    // return callback(); // test
    this.$emit('validate', this.form.username, callback)
  }
  validatePasswordReword(
    rule: object,
    value: string,
    callback: (e?: Error) => void
  ): void {
    this.setError()
    if (!value) {
      callback(new Error('请再次输入密码'))
    } else if (this.form.password !== value) {
      callback(new Error('两次输入密码不一致'))
    } else {
      callback()
    }
  }
  validateMobile(
    rule: object,
    value: string,
    callback: (e?: Error) => void
  ): void {
    this.setError()
    const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!value) {
      callback(new Error('请输入手机号'))
    } else if (!phoneReg.test(value)) {
      callback(new Error('请正确输入手机号'))
    } else {
      callback()
    }
  }
  validateError(rule: object, value: string, callback: (e?: Error) => void) {
    this.setError()
    if (this.formError) {
      callback(new Error(this.formError))
    } else {
      callback()
    }
  }
  redirectHandle() {
    this.$router.push({ name: 'Login' })
  }
}
</script>

<style lang="scss" module>
.form {
  margin-top: 20px;
  .option {
    display: flex;
    justify-content: space-between;
    .btn {
      float: right;
    }
  }
  .license {
    display: flex;
    justify-content: flex-start;
  }
  .formError {
    margin-top: -22px;
    padding-top: 0;
  }
}
</style>
