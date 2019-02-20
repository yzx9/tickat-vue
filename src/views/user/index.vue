<template>
  <div>
    <AppUserInfo/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import AppUserInfo from '@/components/user/AppUserInfo.vue'

@Component({
  components: {
    AppUserInfo
  }
})
export default class Index extends Vue {}
</script>

<style lang="scss" module>
</style>
