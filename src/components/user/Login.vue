<template>
  <div>
    <el-row>
      <el-col
        :xl="{ span: 8, offset: 8 }"
        :lg="{ span: 8, offset: 8 }"
        :md="{ span: 12, offset: 6 }"
        :sm="{ span: 12, offset: 6 }"
        :xs="{ span: 24, offset: 0 }"
        :class="$style.warpper"
      >
        <LoginForm
          v-model="formError"
          :loading="loading"
          @submit="handleSubmit"
        />
        <LoginFooter/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LoginForm from '@/components/user/LoginForm.vue'
import LoginFooter from '@/components/user/LoginFooter.vue'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { AxiosPromise } from 'axios'
import Account from '@/models/Account'
import StorageOperator from '@/utils/Storage'

const Auth = namespace('Auth')

@Component({
  components: {
    LoginForm,
    LoginFooter
  }
})
export default class Login extends Vue {
  loading = false
  formError = ''
  redirect: string | undefined = undefined

  @Auth.Action('Login') Login!: (payload: {
    username: string
    password: string
  }) => AxiosPromise

  // 假登录
  @Auth.Mutation('SET_AUTH') SET_AUTH!: (account: Account) => void

  // Hooks
  created() {
    // 修改重定向页面
    const redirect = this.$route.query['redirect']
    if (redirect && typeof redirect === 'string') {
      this.redirect = redirect
    }
  }
  mounted() {
    // 假登录
    this.$message({ type: 'warning', message: '账号：admin，密码任意' })
  }

  // Methods
  handleSubmit(form: {
    username: string
    password: string
    isStorage: boolean
  }) {
    this.loading = true
    this.Login({ username: form.username, password: form.password })
      .then(re => {
        this.loading = false
        if (re.data.type === 0) {
          this.Success(form.isStorage, re.data.data as Account)
        } else if (re.data.type === 1) {
          this.formError = re.data.message
        }
      })
      .catch(e => {
        // 假登录
        if (form.username === 'admin') {
          const account = new Account(
            'admin',
            'admin',
            'images/avatars/default.jpg'
          )
          this.SET_AUTH(account)
          this.Success(form.isStorage, account)
        } else {
          throw e
        }
      })
      .catch(error => {
        this.loading = false
        this.formError = '服务器开小差了，请稍后再试'
      })
  }
  Success(isStorage?: boolean, account?: Account) {
    if (isStorage && account) {
      StorageOperator.set('Auth', account)
    }

    if (this.redirect) {
      this.$router.push(this.redirect)
    } else {
      this.$router.push({ name: 'Index' })
    }
  }
}
</script>

<style lang="scss" module>
.warpper {
  padding: 36px 30px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 2px 6px -2px rgba(0, 0, 0, 0.1);
}
</style>
