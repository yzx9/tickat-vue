<template>
  <el-menu
    mode="horizontal"
    :default-active="defaultActive"
    :class="$style.wrapper"
    @select="handleSelect"
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
    <el-menu-item
      index="user"
      :class="$style.right"
      :route="authRouter"
    >
      <img :src="avatar">
    </el-menu-item>
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
  defaultActive = '/home'

  get authRouter() {
    return { name: this.isAuth ? 'User' : 'Login' }
  }
  get avatar() {
    return `${process.env.BASE_URL}${this.account.avatar}`
  }

  handleSelect(active: string) {
    // ???
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
