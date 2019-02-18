<template>
  <el-menu
    router
    mode="horizontal"
    :default-active="defaultActive"
    :class="$style.wrapper"
    @select="handleSelect"
  >
    <el-menu-item
      index="home"
      style="display: inline;"
    >
      <AppLogo
        :height="'36px'"
        :width="'36px'"
      />
    </el-menu-item>
    <el-menu-item index="square">广场</el-menu-item>
    <el-menu-item index="group">圈子</el-menu-item>
    <el-menu-item
      index="user"
      :class="$style.right"
    >
      <img
        :src="account.avatar"
        @click="avatarHandle"
      >
    </el-menu-item>
    <el-menu-item
      index="message"
      :class="$style.right"
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
  @Auth.State('account')
  public account!: Account
  @Auth.Getter('isAuth')
  public isAuth!: boolean
  public defaultActive = '/home'

  public handleSelect(active: string) {
    // ???
  }
  public avatarHandle() {
    if (this.isAuth) {
      this.$router.push({ name: 'user' })
    } else {
      this.$router.push({ name: 'login' })
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
