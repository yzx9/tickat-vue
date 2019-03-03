<template>
  <router-view class="app"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component
export default class Index extends Vue {
  @Mutation('SET_CLIENT_WIDTH') setClientWidth!: (payload: {
    width: number
  }) => void
  @Mutation('SET_CLIENT_HEIGHT') setClientHeight!: (payload: {
    height: number
  }) => void

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
  }
}
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // 滚动条样式
  &::-webkit-scrollbar {
    // 滚动条整体样式
    // 高宽分别对应横竖滚动条的尺寸
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    // 滚动条里面小方块
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-track {
    // 滚动条里面轨道
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
body {
  background-color: #eef3f6;
}
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
