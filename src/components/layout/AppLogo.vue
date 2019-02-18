<template>
    <div :class="$style.logo">
        <img
            alt="logo"
            src="@/assets/icons/logo.png"
            :style="{ height: height, width: width }"
        >
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AppLogo extends Vue {
    @Prop({ type: String, default: '100px' })
    public height!: string;
    @Prop({ type: String, default: '100px' })
    public width!: string;
}
</script>

<style lang="scss" module>
.logo {
    line-height: 100px;
    margin: 10px 20px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>

