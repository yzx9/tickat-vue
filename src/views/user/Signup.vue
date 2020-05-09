<template>
  <div>
    <BaseLogo
      :height="logo.height"
      :width="logo.width"
    />
    <Signup/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BaseLogo from '@/components/layout/BaseLogo.vue'
import Signup from '@/components/user/Signup.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

@Component({
  components: {
    BaseLogo,
    Signup,
    TheFooter
  }
})
export default class SignupView extends Vue {
  logo = {
    height: '100px',
    width: '300px'
  }
}
</script>
