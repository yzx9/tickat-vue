<template>
  <el-container :class="$style.container">
    <el-header :class="$style.header">
      <TheNav/>
    </el-header>
    <el-main>
      <PomodoroDialog
        :visible="dialogVisible"
        :callback="[ onDone ]"
      />
      <router-view/>
    </el-main>
    <el-footer>
      <TheFooter/>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TheNav from '@/components/layout/TheNav.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import PomodoroDialog from '@/components/dashboard/pomodoro/PomodoroDialog.vue'

const Pomodoro = namespace('Pomodoro')

@Component({
  components: {
    TheNav,
    TheFooter,
    PomodoroDialog
  }
})
export default class DefaultLayout extends Vue {
  @Pomodoro.State('dialogVisible') dialogVisible!: boolean

  /**
   * @param flag: 正常退出/手动退出
   */
  onDone(flag: boolean) {
    if (flag) {
      this.$alert('OK')
    } else {
      this.$alert('退出')
    }
  }
}
</script>

<style lang="scss" module>
.container {
  .header {
    padding: 0px;
  }
}
</style>
