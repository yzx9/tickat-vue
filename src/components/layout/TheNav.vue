<template>
  <el-menu
    mode="horizontal"
    :default-active="defaultActive"
    :class="$style.wrapper"
    @select="onSelect"
    router
  >
    <el-menu-item
      index="Index"
      style="display: inline;"
      :route="{ name: 'Index' }"
    >
      <BaseLogo
        :height="'36px'"
        :width="'108px'"
      />
    </el-menu-item>
    <el-menu-item
      index="Square"
      :route="{ name: 'Square'}"
    >广场</el-menu-item>
    <el-menu-item
      index="Group"
      :route="{ name: 'Group'}"
    >圈子</el-menu-item>
    <el-submenu
      index="User-Submenu"
      :class="$style.right"
      popper-class="123"
    >
      <template slot="title">
        <img :src="avatar">
      </template>
      <el-menu-item
        v-if="!isAuth"
        index="Login"
        :route="{ name: 'Login'}"
      >登录</el-menu-item>
      <el-menu-item
        index="User"
        v-if="isAuth"
        :route="{ name: 'User' }"
      >我的</el-menu-item>
      <el-menu-item
        index="Logout"
        v-if="isAuth"
        :route="{}"
        @click="onLogout"
      >注销</el-menu-item>
    </el-submenu>
    <el-menu-item
      index="Message"
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
import BaseLogo from '@/components/layout/BaseLogo.vue'
import Account from '@/models/Account'

const Auth = namespace('Auth')

@Component({
  components: {
    BaseLogo
  }
})
export default class TheNav extends Vue {
  @Auth.State('account') account!: Account
  @Auth.Getter('isAuth') isAuth!: boolean
  @Auth.Action('Logout') logout!: () => void

  get defaultActive() {
    return this.$route.name
  }
  get authRouter() {
    return { name: this.isAuth ? 'User' : 'Login' }
  }
  get avatar() {
    return `${process.env.BASE_URL}${this.account.avatar}`
  }

  onLogout() {
    this.$confirm('确定注销？', '提示', { type: 'warning' }).then(() => {
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
