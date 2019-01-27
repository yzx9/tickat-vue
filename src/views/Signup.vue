<template>
    <el-container>
        <el-main>
            <app-logo></app-logo>
            <app-signup></app-signup>
            <app-footer></app-footer>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AppLogo from '@/components/AppLogo.vue';
import AppSignup from '@/components/AppSignup.vue';
import AppFooter from '@/components/AppFooter.vue';

@Component({
    components: {
        AppLogo,
        AppSignup,
        AppFooter,
    },
})
export default class Signup extends Vue {
    
}
</script>