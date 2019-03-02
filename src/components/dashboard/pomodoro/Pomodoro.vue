<template>
  <div>
    <el-card shadow="hover">
      <template slot="header">
        <Clock
          :size="180"
          :color="color"
          :percentage="percentage"
          :interval="interval"
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
    <PomodoroDialog
      :visible="dialogVisible"
      @close="onDialogClose"
      @submit="onDialogSubmit"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import Clock from '@/components/widgets/Clock.vue'
import PomodoroDialog from '@/components/dashboard/pomodoro/PomodoroDialog.vue'
import GradientColor from '@/utils/GradientColor'

@Component({
  components: {
    Clock,
    PomodoroDialog
  }
})
export default class Pomodoro extends Vue {
  isPomodoroTime = false
  totalTime = 0
  passTime = 0
  pause = false
  timer: number | undefined = undefined
  dialogVisible = false
  interval = 100

  get color() {
    return GradientColor.getColorByPercentage(
      '#67C23A',
      '#409EFF',
      this.percentage / 100
    )
  }
  get percentage() {
    if (this.isPomodoroTime) {
      return (this.passTime / this.totalTime) * 100
    } else {
      return 100
    }
  }
  // Hooks
  beforeDestory() {
    if (this.timer === undefined) {
      clearInterval(this.timer)
    }
  }
  // Methods
  onDialogOpen() {
    this.dialogVisible = true
  }
  onDialogSubmit(time: number) {
    this.dialogVisible = false
    this.isPomodoroTime = true
    this.totalTime = time * 60 * 1000
    this.passTime = 0
    this.timer = setInterval(() => {
      if (this.pause) {
        return
      } else if (this.passTime < this.totalTime) {
        this.passTime += this.interval
      } else {
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.isPomodoroTime = false
        this.$alert('OK')
      }
    }, this.interval)
  }
  onDialogClose() {
    this.dialogVisible = false
  }
  onPause(flag?: boolean) {
    if (flag !== undefined) {
      this.pause = flag
    } else {
      this.pause = !this.pause
    }
  }
  onExit() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.isPomodoroTime = false
    this.$alert('退出')
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
