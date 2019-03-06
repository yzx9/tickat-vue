<template>
  <div>
    <BaseLogo
      :height="logo.height"
      :width="logo.width"
    />
    <Login/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BaseLogo from '@/components/layout/BaseLogo.vue'
import Login from '@/components/user/Login.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

@Component({
  components: {
    BaseLogo,
    Login,
    TheFooter
  }
})
export default class LoginView extends Vue {
  private logo = {
    height: '100px',
    width: '300px'
  }
}
</script>
