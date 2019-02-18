<template>
  <div>
    <AppLogo
      :height="logo.height"
      :width="logo.width"
    />
    <AppSignup/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppLogo from '@/components/layout/AppLogo.vue'
import AppSignup from '@/components/user/AppSignup.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

@Component({
  components: {
    AppLogo,
    AppSignup,
    TheFooter
  }
})
export default class Signup extends Vue {
  private logo = {
    height: '100px',
    width: '100px'
  }
}
</script>
