<template>
    <el-container :class="$style.container">
        <el-header :class="$style.header">
            <TheNav/>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
        <el-footer>
            <TheFooter/>
        </el-footer>
    </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TheNav from '@/components/layout/TheNav.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

@Component({
    components: {
        TheNav,
        TheFooter,
    },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="less" module>
.container {
    .header {
        padding: 0px;
    }
}
</style>
