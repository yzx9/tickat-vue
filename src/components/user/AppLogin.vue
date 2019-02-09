<!--
 * @Author: Celeste
 * @Date: 2019-01-24 22:05:41
 * @LastEditors: Celeste
 * @LastEditTime: 2019-02-09 22:17:52
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
                <LoginForm
                    v-model="formError"
                    :loading="loading"
                    @submit="submitHandle"
                />
                <LoginFooter/>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LoginForm from '@/components/user/LoginForm.vue';
import LoginFooter from '@/components/user/LoginFooter.vue';

@Component({
    components: {
        LoginForm,
        LoginFooter,
    },
})
export default class AppLogin extends Vue {
    public loading = false;
    public formError = '';
    public submitHandle(form: any) {
        this.loading = true;
        this.$http
            .post('/api/signup', form)
            .then(re => {
                this.loading = false;
                if (re.data.type === 0) {
                    this.$router.push('/');
                    // TODO: commit state
                } else if (re.data.type === 1) {
                    this.formError = re.data.message;
                }
            })
            .catch(error => {
                this.loading = false;
                this.formError = '服务器开小差了，请稍后再试';
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
