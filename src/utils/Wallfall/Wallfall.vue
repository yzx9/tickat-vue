<template>
  <div :style="{ 'column-count': column, 'column-gap': gap}">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component({
  components: {}
})
export default class Wallfall extends Vue {
  @Prop({ type: Number, default: 3 }) column!: number
  @Prop({ type: Number, default: 0 }) gap!: number
}
</script>

<style lang="scss" module>
</style>
