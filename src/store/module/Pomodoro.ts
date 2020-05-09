import { Getters, Mutations, Actions, Module } from 'vuex-smart-module'

class PomodoroState {
  /**是否处于番茄时间 */
  public isPomodoroTime = false
  /**总时间, 单位为毫秒 */
  public totalTime = 0
  /**已消耗时间, 单位为毫秒 */
  public passTime = 0
  /**是否暂停 */
  public pause = false
  /**计时器 */
  public timer: number | undefined = undefined
  /**回调函数集 */
  public callback: ((flag: boolean) => void)[] = []
  /**显示对话框 */
  public dialogVisible: boolean = false
  /**时间间隔(毫秒), 越小越精确, 但消耗资源也越大 */
  public interval = 1000
}

class PomodoroGetters extends Getters<PomodoroState> {
  /**已完成的百分比，0 ~ 100 */
  public get percentage() {
    if (this.state.isPomodoroTime) {
      return (this.state.passTime / this.state.totalTime) * 100
    } else {
      return 100
    }
  }
  /**剩余时间 */
  public get remainingTime() {
    return this.state.totalTime - this.state.passTime
  }
}

class PomodoroMutations extends Mutations<PomodoroState> {
  /**
   * 开始番茄钟
   * @param payload 总时间，定时器
   */
  public SET_TIME(payload: { totalTime: number; timer: number }) {
    this.state.isPomodoroTime = true
    this.state.totalTime = payload.totalTime
    this.state.passTime = 0
    this.state.timer = payload.timer
  }
  /**
   * 添加passtime
   * @param payload 时长
   */
  public ADD_TIME(payload: { increment: number }) {
    let increment = this.state.interval
    if (payload) {
      increment = payload.increment
    }
    const total = this.state.totalTime
    if (this.state.passTime + increment <= total) {
      this.state.passTime += increment
    } else if (this.state.passTime + increment > total) {
      this.state.passTime = total
      this.END_TIME()
    }
  }
  /**
   * 结束当前番茄钟
   */
  public END_TIME() {
    this.state.isPomodoroTime = false
    // 清空计时器
    if (this.state.timer !== undefined) {
      clearInterval(this.state.timer)
    }
    this.state.timer = undefined
    // 调用所有回调函数后清空
    if (this.state.callback) {
      const flag = this.state.passTime === this.state.totalTime
      this.state.callback.map(func => func(flag))
      this.state.callback = []
    }
  }
  /**
   * 暂停
   * @param payload 是否暂停，不传入即为切换状态
   */
  public PAUSE(payload?: { flag: boolean }) {
    if (payload !== undefined) {
      this.state.pause = payload.flag
    } else {
      this.state.pause = !this.state.pause
    }
  }
  /**
   * 显示Dialog
   * @param payload 是否显示Dialog，不传入即为切换状态
   */
  public SHOW_DIALOG(payload: { flag?: boolean }) {
    if (payload.flag !== undefined) {
      this.state.dialogVisible = payload.flag
    } else {
      this.state.dialogVisible = !this.state.dialogVisible
    }
  }
  /**
   * 添加回调函数，结束后会依次调用每个回调函数
   * @param payload 回调函数
   */
  public ADD_CALLBACK(payload: { func: (flag: boolean) => void }) {
    this.state.callback.push(payload.func)
  }
  /**
   * 设置时间间隔
   * @param payload 时间间隔
   */
  public SET_INTERVAL(payload: { interval: number }) {
    this.state.interval = payload.interval
  }
}

class PomodoroActions extends Actions<
  PomodoroState,
  PomodoroGetters,
  PomodoroMutations,
  PomodoroActions
> {
  public SetPomodoro(payload: {
    totalMinutes: number
    interval?: number
    callback?: ((flag: boolean) => void)[]
  }) {
    // 设置时间间隔
    if (payload.interval) {
      this.commit('SET_INTERVAL', { interval: payload.interval })
    }
    // 设置定时器
    let timer = setInterval(() => {
      if (!this.state.pause) {
        this.commit('ADD_TIME', { increment: this.state.interval })
      }
    }, this.state.interval)
    // 开始番茄钟
    this.commit('SET_TIME', {
      totalTime: payload.totalMinutes * 60 * 1000,
      timer
    })
    // 添加回调函数
    if (payload.callback) {
      payload.callback.map(func => this.commit('ADD_CALLBACK', { func }))
    }
    // 关闭Dialog
    this.commit('SHOW_DIALOG', { flag: false })
  }
}

export const Pomodoro = new Module({
  state: PomodoroState,
  getters: PomodoroGetters,
  mutations: PomodoroMutations,
  actions: PomodoroActions
})
