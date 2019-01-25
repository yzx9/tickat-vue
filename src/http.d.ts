import Vue from 'vue'
import { AxiosAdapter } from 'axios'

declare module 'vue/types/vue' {
    interface Vue {
        $http: AxiosAdapter
    }
}