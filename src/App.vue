<template>
  <router-view class="app" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

const Pomodoro = namespace('Pomodoro')

@Component
export default class Index extends Vue {
  @Mutation('SET_CLIENT_WIDTH') setClientWidth!: (payload: {
    width: number
  }) => void
  @Mutation('SET_CLIENT_HEIGHT') setClientHeight!: (payload: {
    height: number
  }) => void
  @Pomodoro.State('isPomodoroTime') isPomodoroTime!: boolean
  @Pomodoro.Mutation('PAUSE') pause!: (payload?: { flag: boolean }) => void
  @Pomodoro.Getter('remainingTime') remainingTime?: number

  // Hooks
  mounted() {
    // 初始值
    this.setClientWidth({
      width: document.documentElement.clientWidth
    })
    this.setClientHeight({
      height: document.documentElement.clientHeight
    })
    // 监听事件
    window.onresize = () => {
      this.setClientWidth({
        width: document.documentElement.clientWidth
      })
      this.setClientHeight({
        height: document.documentElement.clientHeight
      })
    }
    window.onblur = () => {
      if (this.isPomodoroTime) {
        this.pause({ flag: true })
      }
    }
    window.onfocus = () => {
      if (this.isPomodoroTime) {
        this.pause({ flag: false })

        let msg = '欢迎回来！在您离开的这一段时间，我们已经帮您暂停计时。'
        if (this.remainingTime) {
          let time = this.formatTime(this.remainingTime)
          msg += `还有${time}就可以休息了哦！`
        }
        this.$notify({
          title: '当前番茄钟尚未完成',
          message: msg,
          type: 'warning'
        })
      }
    }
  }

  // Methods
  formatTime(time: number) {
    time = Math.floor(time / 1000)
    const hours = Math.floor(time / 3600)
    time -= hours * 3600
    const minutes = Math.floor(time / 60)
    // time -= minutes * 60
    // const seconds = Math.floor(time / 60)

    let str = ''
    if (hours) {
      str += `${hours}小时`
    }
    if (minutes) {
      if (!hours && minutes <= 1) {
        str = '不足一分钟'
      } else {
        str += `${minutes}分钟`
      }
    }
    return str
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #eef3f6;
}
// 滚动条样式
::-webkit-scrollbar {
  // 滚动条整体样式
  // 高宽分别对应横竖滚动条的尺寸
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-thumb {
  // 滚动条里面小方块
  border-radius: 4px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
::-webkit-scrollbar-track {
  // 滚动条里面轨道
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
