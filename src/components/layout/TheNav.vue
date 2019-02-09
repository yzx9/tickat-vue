<template>
    <el-menu
        router
        mode="horizontal"
        :default-active="defaultActive"
        :class="$style.wrapper"
        @select="handleSelect"
    >
        <el-menu-item
            index="home"
            style="display: inline;"
        >
            <AppLogo
                :height="'36px'"
                :width="'36px'"
            />
        </el-menu-item>
        <el-menu-item index="square">广场</el-menu-item>
        <el-menu-item index="group">圈子</el-menu-item>
        <el-menu-item
            index="user"
            :class="$style.right"
        >
            <a
                href="#"
                :class="$style.avatar"
            >
                <img :src="avatar">
            </a>
        </el-menu-item>
        <el-menu-item
            index="message"
            :class="$style.right"
        >
            <i class="el-icon-bell"/>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppLogo from '@/components/layout/AppLogo.vue';

@Component({
    components: {
        AppLogo,
    },
})
export default class TheNav extends Vue {
    public avatar = 'images/avatars/avatar-11.png';
    public defaultActive = '/home';

    public handleSelect(active: string) {
        // TODO
    }
}
</script>

<style lang="less" module>
.wrapper {
    box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
    .right {
        float: right !important;
    }
}
</style>
