<template>
  <div>
    <el-alert type="danger" :closable="false"></el-alert>
    <el-alert type="info" close-text="知道了"></el-alert>
    <el-alert type="warning" @close="hello"></el-alert>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class TodoListAlert extends Vue {
  
}
</script>
