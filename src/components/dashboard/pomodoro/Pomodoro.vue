<template>
  <div>
    <el-card shadow="hover">
      <template slot="header">
        <Clock
          :size="180"
          :color="color"
          :percentage="percentage"
          :interval="50"
        />
      </template>
      <div :class="$style.footer">
        <span>新的一天，此刻开启</span>
        <div :class="[$style.bottom, $style.clearfix]">
          <el-button
            v-if="!isPomodoroTime"
            type="text"
            :class="$style.button"
            @click="onDialogOpen"
          >打卡</el-button>
          <el-button
            v-if="isPomodoroTime"
            type="text"
            :class="$style.button"
            @click="onExit()"
          >结束</el-button>
          <el-button
            v-if="isPomodoroTime"
            type="text"
            :class="$style.button"
            @click="onPause()"
          >{{ pause? '开始': '暂停'}}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import Clock from '@/components/widgets/Clock.vue'
import PomodoroDialog from '@/components/dashboard/pomodoro/PomodoroDialog.vue'
import GradientColor from '@/utils/GradientColor'

const PomodoroStore = namespace('Pomodoro')

@Component({
  components: {
    Clock,
    PomodoroDialog
  }
})
export default class Pomodoro extends Vue {
  @PomodoroStore.State('isPomodoroTime') isPomodoroTime!: boolean
  @PomodoroStore.Getter('percentage') percentage!: number
  @PomodoroStore.Mutation('PAUSE') pause!: () => void
  @PomodoroStore.Mutation('END_TIME') end!: () => void
  @PomodoroStore.Mutation('SHOW_DIALOG') showDialog!: (payload?: {
    flag: boolean
  }) => void

  get color() {
    return GradientColor.getColorByPercentage(
      '#67C23A',
      '#409EFF',
      this.percentage / 100
    )
  }
  // Methods
  onDialogOpen() {
    this.showDialog({ flag: true })
  }
  onPause(flag?: boolean) {
    this.pause()
  }
  onExit() {
    this.end()
  }
}
</script>

<style lang="scss" module>
.footer {
  padding: 14px;
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    .button {
      margin-left: 10px;
      padding: 0;
      float: right;
    }
  }
  .clearfix {
    &::before,
    &::after {
      display: table;
      content: '';
    }
    &::after {
      clear: both;
    }
  }
}
</style>
