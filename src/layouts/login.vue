<template>
  <el-container>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>
      <TheFooter/>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TheFooter from '@/components/layout/TheFooter.vue'

@Component({
  components: {
    TheFooter
  }
})
export default class LoginLayout extends Vue {}
</script>

<style lang="scss" module>
</style>
