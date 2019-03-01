<template>
  <el-menu
    mode="horizontal"
    :default-active="defaultActive"
    :class="$style.wrapper"
    @select="onSelect"
    router
  >
    <el-menu-item
      index="index"
      style="display: inline;"
      :route="{ name: 'Index' }"
    >
      <AppLogo
        :height="'36px'"
        :width="'36px'"
      />
    </el-menu-item>
    <el-menu-item
      index="square"
      :route="{ name: 'Square'}"
    >广场</el-menu-item>
    <el-menu-item
      index="group"
      :route="{ name: 'Group'}"
    >圈子</el-menu-item>
    <el-submenu
      index="user"
      :class="$style.right"
      popper-class="123"
    >
      <template slot="title">
        <img :src="avatar">
      </template>
      <el-menu-item
        v-if="!isAuth"
        index="user/login"
        :route="{ name: 'Login'}"
      >登录</el-menu-item>
      <el-menu-item
        index="user/profile"
        v-if="isAuth"
        :route="{ name: 'User' }"
      >我的</el-menu-item>
      <el-menu-item
        index="user/logout"
        v-if="isAuth"
        :route="{}"
        @click="onLogout"
      >注销</el-menu-item>
    </el-submenu>
    <el-menu-item
      index="message"
      :class="$style.right"
      :route="{ name: 'Message'}"
    >
      <i class="el-icon-bell"/>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import AppLogo from '@/components/layout/AppLogo.vue'
import Account from '@/models/Account'

const Auth = namespace('Auth')

@Component({
  components: {
    AppLogo
  }
})
export default class TheNav extends Vue {
  @Auth.State('account') account!: Account
  @Auth.Getter('isAuth') isAuth!: boolean
  @Auth.Action('Logout') logout!: () => void
  defaultActive = '/home'

  get authRouter() {
    return { name: this.isAuth ? 'User' : 'Login' }
  }
  get avatar() {
    return `${process.env.BASE_URL}${this.account.avatar}`
  }

  onLogout() {
    this.$confirm('确定注销？', '提示', { type: 'warning' })
      .then(() => {
        this.logout()
        this.$message({ type: 'success', message: '注销成功' })
        this.$router.push({ name: 'Login' })
      })
  }
  onSelect(active: string) {
    // TODO
  }
}
</script>

<style lang="scss" module>
.wrapper {
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
  .right {
    float: right !important;
    img {
      height: 38px;
      width: 38px;
    }
  }
}
</style>
