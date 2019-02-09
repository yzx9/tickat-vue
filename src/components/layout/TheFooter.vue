<template>
    <p :class="$style.footer">{{ text }}</p>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AppFooter extends Vue {
    private get year(): number {
        const date = new Date();
        return date.getFullYear();
    }
    private get text(): string {
        return `Tickat © ${this.year}`;
    }
}
</script>

<style lang="less" module>
.footer {
    color: gray;
    margin: 20px 10px;
}
</style>
