<template>
  <el-menu
    mode="horizontal"
    :default-active="defaultActive"
    :class="$style.wrapper"
    @select="handleSelect"
  >
    <el-menu-item
      index="index"
      style="display: inline;"
      :route="{ name: 'index' }"
    >
      <AppLogo
        :height="'36px'"
        :width="'36px'"
      />
    </el-menu-item>
    <el-menu-item
      index="square"
      :route="{ name: 'square'}"
    >广场</el-menu-item>
    <el-menu-item
      index="group"
      :route="{ name: 'group'}"
    >圈子</el-menu-item>
    <el-menu-item
      index="user"
      :class="$style.right"
    >
      <img
        :src="avatar"
        @click="avatarHandle"
      >
    </el-menu-item>
    <el-menu-item
      index="message"
      :class="$style.right"
      :route="{ name: 'message'}"
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

  get avatar() {
    return `${process.env.BASE_URL}${this.account.avatar}`
  }

  handleSelect(active: string) {
    // ???
  }
  avatarHandle() {
    if (this.isAuth) {
      this.$router.push({ name: 'User' })
    } else {
      this.$router.push({ name: 'Login' })
    }
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
