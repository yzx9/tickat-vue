<template>
  <div
    :class="$style.wrapper"
    v-html="innerText"
    :contenteditable="canEdit"
    @focus="isLocked = true"
    @blur="isLocked = false"
    @input="changeText"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'

@Component
export default class EditDiv extends Vue {
  @Prop({ type: String, default: '' })
  public value!: string
  @Prop({ type: Boolean, default: true })
  public canEdit!: boolean
  private innerText = this.value
  private isLocked = false

  @Watch('value')
  private onValueChange() {
    if (!this.isLocked || !this.innerText) {
      this.innerText = this.value
    }
  }

  private changeText() {
    this.$emit('input', this.$el.innerHTML)
  }
}
</script>

<style lang="scss" module>
.wrapper {
  width: 100%;
  height: 100%;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  &[contenteditable='true'] {
    user-modify: read-write-plaintext-only;
    &:empty:before {
      content: attr(placeholder);
      display: block;
      color: #ccc;
    }
  }
}
</style>
