<template>
    <el-container>
        <el-main>
            <AppLogo
                :height="logo.height"
                :width="logo.width"
            />
            <AppSignup/>
            <TheFooter/>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AppLogo from '@/components/AppLogo.vue';
import AppSignup from '@/components/AppSignup.vue';
import TheFooter from '@/components/TheFooter.vue';

@Component({
    components: {
        AppLogo,
        AppSignup,
        TheFooter,
    },
})
export default class Signup extends Vue {
    private logo = {
        height: '100px',
        width: '100px',
    };
}
</script>
