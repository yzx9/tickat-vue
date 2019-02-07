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
                    :error="formError"
                ></el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-button
                                type="text"
                                :class="$style.link"
                                @click="clickHandle"
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
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class LoginForm extends Vue {
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
    private loading: boolean = false;
    private formError: string = '';

    public setError(e?: string) {
        this.formError = e === undefined ? '' : e;
        // (this.$refs['form'] as any).validateField('error');
    }
    private submit() {
        const form = 'form';
        (this.$refs[form] as any).validate((valid: boolean) => {
            if (valid) {
                this.loading = true;
                this.$http
                    .post('/login', {
                        username: this.form.username,
                        password: this.form.password,
                    })
                    .then((re) => {
                        this.loading = false;
                        if (re.data.type === 0) {
                            this.$router.push('/');
                            // TODO:commit state
                        } else if (re.data.type === 1) {
                            this.setError(re.data.message);
                        }
                    })
                    .catch((error) => {
                        this.loading = false;
                        this.setError('服务器开小差了，请稍后再试');
                    });
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
        if (this.formError) {
            callback(new Error(this.formError));
        } else {
            callback();
        }
    }
    private clickHandle() {
        this.$router.push('signup');
    }
}
</script>

<style lang="less" module>
.form {
    margin-top: 20px;
    .link {
        float: left;
    }
    .btn {
        float: right;
        width: 100%;
    }
}
</style>
