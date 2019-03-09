<template>
  <el-card
    shadow="always"
    :body-style="{ padding: '0px' }"
  >
    <div :class="$style.content">
      <img :src="image">
    </div>
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
.content {
  img {
    width: 100%;
    display: block;
  }
}
</style>
