<!--
 * @Author: Celeste
 * @Date: 2019-01-26 14:37:06
 * @LastEditors: Celeste
 * @LastEditTime: 2019-02-09 22:18:10
 * @Description: 
 -->
 
<template>
    <div>
        <el-row>
            <el-col
                :xl="{ span: 8, offset: 8 }"
                :lg="{ span: 8, offset: 8 }"
                :md="{ span: 12, offset: 6 }"
                :sm="{ span: 12, offset: 6 }"
                :xs="{ span: 24, offset: 0 }"
                :class="$style.warpper"
            >
                <SignupForm
                    v-model="formError"
                    :loading="loading"
                    @submit="submitHandle"
                    @validate="validateHandle"
                />
                <LoginFooter/>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SignupForm from '@/components/user/SignupForm.vue';
import LoginFooter from '@/components/user/LoginFooter.vue';

@Component({
    components: {
        SignupForm,
        LoginFooter,
    },
})
export default class AppSignup extends Vue {
    public loading = false;
    public formError = '';
    public submitHandle(form: any) {
        this.loading = true;
        this.$http
            .post('/api/signup', form)
            .then(data => {
                this.loading = false;
                this.$router.push('/login');
            })
            .catch(error => {
                this.loading = false;
                this.formError = '服务器开小差了，请稍后再试';
            });
    }
    public validateHandle(username: string, callback: (e?: Error) => void) {
        this.$http
            .post('/api/signup/validate', username)
            .then(re => {
                if (re.data.type === 0) {
                    callback();
                } else if (re.data.type === 1) {
                    callback(new Error('用户名已被占用'));
                } else if (re.data.type === 2) {
                    callback(new Error('用户名只能由英文、数字、下划线构成'));
                } else if (re.data.message) {
                    callback(new Error(re.data.message));
                } else {
                    callback();
                }
            })
            .catch(e => {
                // TODO: 错误处理
            });
    }
}
</script>

<style lang="less" module>
.warpper {
    padding: 36px 30px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 2px 6px -2px rgba(0, 0, 0, 0.1);
}
</style>
