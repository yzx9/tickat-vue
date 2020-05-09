<template>
  <div :class="$style.item">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component({
  components: {}
})
export default class WallfallItem extends Vue {}
</script>

<style lang="scss" module>
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  -webkit-column-break-inside: avoid;
}
</style>
