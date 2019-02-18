<!--
 * @Author: Celeste
 * @Date: 2019-01-24 22:49:50
 * @LastEditors: Celeste
 * @LastEditTime: 2019-02-18 23:58:50
 * @Description: V-model: 表单错误信息 :loading @submit
 -->

<template>
    <el-row>
        <el-col
            :xl="{ span: 16, offset: 4 }"
            :lg="{ span: 20, offset: 2 }"
            :md="{ span: 20, offset: 2 }"
            :sm="{ span: 24, offset: 0 }"
            :xs="{ span: 24, offset: 0 }"
        >
            <el-form
                ref="form"
                :class="$style.form"
                :model="form"
                :rules="rules"
                v-loading="loading"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="form.username"
                        placeholder="用户名"
                        prefix-icon="fa fa-user-o"
                        clearable
                    />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="密码"
                        prefix-icon="fa fa-lock"
                        clearable
                    />
                </el-form-item>
                <el-form-item
                    prop="error"
                    :class="$style.formError"
                    :error="error"
                ></el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col
                            :span="12"
                            :class="$style.option"
                        >
                            <el-button
                                type="text"
                                @click="redirectHandle"
                            >没有账号？</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button
                                type="primary"
                                :class="$style.btn"
                                @click="submit"
                            >登录</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';

@Component
export default class LoginForm extends Vue {
    @Model('change')
    public error!: string;
    @Prop({ type: Boolean, default: false })
    public loading!: boolean;
    private form = {
        username: '',
        password: '',
    };
    private rules = {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { max: 20, message: '长度不大于 20 个字符', trigger: 'blur' },
            { validator: this.validateUsername },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { max: 20, message: '长度不大于 20 个字符', trigger: 'blur' },
            { max: 20, message: '长度不大于 20 个字符', trigger: 'blur' },
            { validator: this.validatePassword },
        ],
        error: [{ validator: this.validateError }],
    };

    public setError(e: string = '') {
        this.$emit('change', e);
    }
    private submit() {
        const form = 'form';
        (this.$refs[form] as any).validate((valid: boolean) => {
            if (valid) {
                this.$emit('submit', this.form);
            }
        });
    }
    private reset(): void {
        const form = 'form';
        (this.$refs[form] as any).resetFields();
    }
    private validateUsername(
        rule: object,
        value: string,
        callback: (e?: Error) => void,
    ) {
        this.setError();
        callback();
    }
    private validatePassword(
        rule: object,
        value: string,
        callback: (e?: Error) => void,
    ) {
        this.setError();
        callback();
    }
    private validateError(
        rule: object,
        value: string,
        callback: (e?: Error) => void,
    ) {
        if (this.error) {
            callback(new Error(this.error));
        } else {
            callback();
        }
    }
    private redirectHandle() {
        this.$router.push('signup');
    }
}
</script>

<style lang="scss" module>
.form {
    margin-top: 20px;
    .option {
        display: flex;
        justify-content: space-between;
        .btn {
            width: 100%;
        }
    }
    .formError {
        margin-top: -22px;
        padding-top: 0;
    }
}
</style>
