<template>
  <div
    :class="$style.wrapper"
    v-html="innerText"
    :contenteditable="canEdit"
    @focus="onFocus"
    @blur="onBlur"
    @input="changeText"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'

@Component
export default class EditDiv extends Vue {
  @Model('change') value!: string
  @Prop({ type: Boolean, default: true }) canEdit!: boolean
  innerText = this.value
  isLocked = false

  @Watch('value')
  onValueChange() {
    if (!this.isLocked || !this.innerText) {
      this.innerText = this.value
    }
  }
  onFocus() {
    this.isLocked = true
  }
  onBlur() {
    this.isLocked = false
  }
  changeText() {
    this.$emit('change', this.$el.innerHTML)
  }
}
</script>

<style lang="scss" module>
.wrapper {
  width: 100%;
  height: 100%;
  min-height: 23px;
  word-break: break-all;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  padding-left: 5px;
  &[contenteditable='true'] {
    // user-modify: read-write-plaintext-only;
    &:empty:before {
      content: attr(placeholder);
      display: block;
      color: #ccc;
    }
  }
}
</style>
