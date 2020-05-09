<template>
  <div
    :class="$style.wrapper"
    :style="{ height: size+'px', width: size+'px' }"
  >
    <div>
      <el-progress
        type="circle"
        :percentage="percentage"
        :show-text="false"
        :stroke-width="10"
        :width="size"
        :color="color"
      />
      <div>
        <div
          :class="$style.point"
          :style="{ background: color }"
        />
        <div
          :class="$style.hour"
          :style="style.hour"
        />
        <div
          :class="$style.minute"
          :style="style.minute"
        />
        <div
          :class="$style.second"
          :style="style.second"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component({
  components: {}
})
export default class Clock extends Vue {
  @Prop({ type: Number, default: 180 }) size!: number
  @Prop({ type: String, default: '#fff' }) color!: string
  @Prop({ type: Number, default: 100 }) percentage!: number
  @Prop({ type: Number, default: 1000 }) interval!: number
  now = new Date()
  timer: number | undefined = undefined

  get style() {
    const transform = this.transform
    const color = this.color
    return {
      hour: { transform: `rotate(${transform.hour}deg)`, background: color },
      minute: {
        transform: `rotate(${transform.minute}deg)`,
        background: color
      },
      second: {
        transform: `rotate(${transform.second}deg)`,
        background: color
      }
    }
  }
  get transform() {
    const now = this.now
    const milliseconds = (now.getMilliseconds() / 1000) * 360
    const second = (now.getSeconds() / 60) * 360 + milliseconds / 60
    const minute = (now.getMinutes() / 60) * 360 + second / 60
    const hour = (now.getHours() / 24) * 360 + minute / 24

    return {
      hour: hour.toFixed(2),
      minute: minute.toFixed(2),
      second: second.toFixed(2)
    }
  }

  // Hooks
  mounted() {
    this.timer = setInterval(() => {
      this.now = new Date()
    }, this.interval)
  }
  beforeDestory() {
    if (this.timer === undefined) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  margin: 0 auto;
  position: relative;
  border-radius: 50%;
  box-shadow: 0 1px 8px rgba(34, 34, 34, 0.3),
    inset 0 1px 8px rgba(34, 34, 34, 0.3);
  > div {
    width: 100%;
    height: 100%;
  }
}
.progress {
  box-shadow: 0 1px 8px rgba(34, 34, 34, 0.3),
    inset 0 1px 8px rgba(34, 34, 34, 0.3);
}
.point {
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  border-radius: 6px;
  display: block;
}
.pointer {
  width: 0;
  height: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: 0 1px 4px rgba(34, 34, 34, 0.3);
}
.hour {
  @extend .pointer;
  margin: -4px 0 -4px -25%;
  padding: 4px 0 4px 25%;
  transform-origin: 100% 50%;
  border-radius: 4px 0 0 4px;
}
.minute {
  @extend .pointer;
  margin: -40% -3px 0;
  padding: 40% 3px 0;
  transform-origin: 50% 100%;
  border-radius: 3px 3px 0 0;
}
.second {
  @extend .pointer;
  margin: -40% -1px 0 0;
  padding: 40% 1px 0;
  transform-origin: 50% 100%;
}
</style>
