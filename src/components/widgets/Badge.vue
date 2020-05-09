<template>
  <el-tooltip :content="badge.description">
    <i>
      <img
        :src="src"
        :style="{ width: width }"
      >
    </i>
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component({
  components: {}
})
export default class Badge extends Vue {
  @Prop({ type: Object, required: true }) badge!: BadgeType
  @Prop({ type: String, default: '34px' }) width!: string
  get src() {
    return require(`@/assets/icons/badge/${this.badge.icon}`)
  }
}

export interface BadgeType {
  id: string
  icon: string
  description?: string
}
</script>

<style lang="scss" module>
</style>
