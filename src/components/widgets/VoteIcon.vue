<template>
  <div
    :class="$style.icon"
    @click="handleClick"
  >
    <i :class="type.icon"/>
    <span v-if="filter">{{ filter }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import '@/assets/fonts/sharehub/style.css'

@Component({
  components: {}
})
export default class VoteIcon extends Vue {
  @Prop({ type: Object, required: true }) type!: VoteIconType

  get filter() {
    let text = this.type.text
    let seeDetail = this.type.seeDetail
    if (seeDetail) {
      if (typeof text === 'number') {
        if (text >= 1e5) {
          return '10w+'
        } else if (text >= 1e4) {
          return '1w+'
        } else if (text >= 1e3) {
          return '999+'
        } else {
          return text
        }
      } else if (typeof text == 'string') {
        return text
      } else {
        return text
      }
    } else {
      return text
    }
  }

  handleClick() {
    this.$emit('click', this.type.id)
  }
}

export interface VoteIconType {
  id: string
  icon: string
  text?: string | number
  seeDetail?: boolean
}
</script>

<style lang="scss" module>
.icon {
  display: inline-flex;
  align-items: center;
  i {
    font-size: 20px;
    cursor: pointer;
    margin-right: 15px;
    color: #9fa3ac;
  }
  span {
    color: #1e1633;
    font-weight: 600;
  }
  i,
  span {
    color: #a1a5ae;
    transition: 0.4s;
  }
  &.active > i,
  &:hover > i,
  &.active > span,
  &:hover > span {
    color: #1e1633;
  }
}
</style>
