<template>
    <div :class="$style.header">
        <a :class="$style.avatar">
            <img :src="src">
        </a>
        <div>
            <a :class="$style.name">{{ post.author }}</a>
            <span :class="$style.passed">{{ passed }}</span>
        </div>
        <a :class="$style.link">
            <i/>
        </a>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Post, Type } from '@/assets/scripts/Post';

@Component
export default class PostHeader extends Vue {
    @Prop({ type: Object, required: true })
    public post!: Post;
    public publicPath = process.env.BASE_URL;

    public get src() {
        return `${this.publicPath}${this.post.avatar}`;
    }
    public get passed() {
        const begintime = this.post.createTime;
        if (!begintime) {
            return '';
        }
        const endtime = new Date();
        const timeDiff = endtime.getTime() - begintime.getTime(); // 时间差的毫秒数
        // 计算出相差天数
        const days = Math.floor(timeDiff / (24 * 3600 * 1000));
        // 计算出小时数
        const leave1 = timeDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
        const hours = Math.floor(leave1 / (3600 * 1000));
        // 计算相差分钟数
        const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
        const minutes = Math.floor(leave2 / (60 * 1000));
        // 计算相差秒数
        const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
        const seconds = Math.round(leave3 / 1000);

        if (days) {
            return `${days}天前`;
        } else if (hours) {
            return `${hours}小时前`;
        } else if (minutes) {
            return `${minutes}分钟前`;
        } else {
            return `${seconds}秒前`;
        }
    }
}
</script>

<style lang="less" module>
.header {
    align-items: center;
    display: flex;
    a {
        text-decoration: none;
    }
    .avatar {
        display: block;
        background-color: white;
        border-radius: 6px;
        min-width: 38px;
        width: 38px;
        height: 38px;
        margin-right: 30px;
    }
    .name {
        display: block;
        margin-right: 10px;
        font-weight: 600;
        &:visited,
        &:active,
        &:link {
            color: #1e1633;
        }
    }
    .passed {
        display: block;
        color: #9fa3ac;
        text-align: left;
    }
    .link {
        margin-left: auto;
        i {
            font-size: 18px;
        }
    }
}
</style>
