<template>
  <router-view class="app"/>
</template>

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
