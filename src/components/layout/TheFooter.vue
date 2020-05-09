<template>
  <p :class="$style.footer">{{ text }}</p>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class AppFooter extends Vue {
  get year(): number {
    const date = new Date()
    return date.getFullYear()
  }
  get text(): string {
    return `Tickat © ${this.year}`
  }
}
</script>

<style lang="scss" module>
.footer {
  display: flex;
  justify-content: center;
  color: gray;
  margin: 20px 10px;
}
</style>
