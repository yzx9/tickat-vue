<template>
  <el-card
    :body-style="{ padding: '0px' }"
    shadow="hover"
  >
    <img
      :src="image"
      :class="$style.img"
    >
  </el-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component({
  components: {}
})
export default class AdCard extends Vue {
  image = `${process.env.BASE_URL}images/aside-image.jpg`
}
</script>

<style lang="scss" module>
.img {
  width: 100%;
}
</style>
