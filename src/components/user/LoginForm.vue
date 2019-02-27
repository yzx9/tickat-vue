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
        <el-form-item prop="isStorage">
          <el-checkbox
            v-model="form.isStorage"
            :class="$style.isStorage"
          >记住我</el-checkbox>
        </el-form-item>
        <el-form-item
          prop="error"
          :class="$style.formError"
          :error="error"
        ></el-form-item>
        <el-form-item>
          <el-row>
            <el-col
              :span="12"
              :class="$style.option"
            >
              <el-button
                type="text"
                @click="redirectHandle"
              >没有账号？</el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                type="primary"
                :class="$style.btn"
                @click="submit"
              >登录</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'

@Component
export default class LoginForm extends Vue {
  @Model('change') error!: string
  @Prop({ type: Boolean, default: false }) loading!: boolean
  form = {
    username: '',
    password: '',
    isStorage: false
  }
  rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { max: 20, message: '长度不大于 20 个字符', trigger: 'blur' },
      { validator: this.validateUsername }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { max: 20, message: '长度不大于 20 个字符', trigger: 'blur' },
      { max: 20, message: '长度不大于 20 个字符', trigger: 'blur' },
      { validator: this.validatePassword }
    ],
    error: [{ validator: this.validateError }]
  }

  setError(e: string = '') {
    this.$emit('change', e)
  }
  submit() {
    const form = 'form'
    ;(this.$refs[form] as any).validate((valid: boolean) => {
      if (valid) {
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
    callback()
  }
  validatePassword(rule: object, value: string, callback: (e?: Error) => void) {
    this.setError()
    callback()
  }
  validateError(rule: object, value: string, callback: (e?: Error) => void) {
    if (this.error) {
      callback(new Error(this.error))
    } else {
      callback()
    }
  }
  redirectHandle() {
    this.$router.push({ name: 'Signup' })
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
      width: 100%;
    }
  }
  .isStorage {
    display: flex;
    justify-content: flex-start;
  }
  .formError {
    margin-top: -22px;
    padding-top: 0;
  }
}
</style>
