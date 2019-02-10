<template>
    <div>
        <AppLogo
            :height="logo.height"
            :width="logo.width"
        />
        <AppLogin/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppLogo from '@/components/layout/AppLogo.vue';
import AppLogin from '@/components/user/AppLogin.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

@Component({
    components: {
        AppLogo,
        AppLogin,
        TheFooter,
    },
})
export default class Login extends Vue {
    private logo = {
        height: '100px',
        width: '100px',
    };
}
</script>

