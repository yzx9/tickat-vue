<template>
  <div>
    <Profile/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import Profile from '@/components/user/Profile.vue'

@Component({
  components: {
    Profile
  }
})
export default class Index extends Vue {}
</script>

<style lang="scss" module>
</style>
