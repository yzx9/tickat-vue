<template>
    <el-container :class="$style.wrapper">
        <el-header :class="$style.header">
            <TheNav/>
        </el-header>
        <el-main :class="$style.center">
            <h1 :class="$style.title">
                <span>404</span> Page Not Found
            </h1>
            <div :class="$style.sub">We couldn't find what you were looking for.</div>
            <div :class="$style.sub">
                <el-button @click="goHome">主页</el-button>
                <el-button @click="goBack">返回</el-button>
            </div>
        </el-main>
        <el-footer>
            <TheFooter/>
        </el-footer>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheNav from '@/components/layout/TheNav.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

@Component({
    components: {
        TheNav,
        TheFooter,
    },
})
export default class NotFound extends Vue {
    public goHome() {
        this.$router.push('/');
    }
    public goBack() {
        this.$router.back();
    }
}
</script>

<style lang="less" module>
.wrapper {
    .header {
        padding: 0px;
    }
}
.center {
    display: block;
    margin-top: 200px;
    margin-bottom: 130px;
    .title {
        margin: 10px 10px;
    }
    .sub {
        margin: 10px 10px 30px 10px;
    }
}
</style>
