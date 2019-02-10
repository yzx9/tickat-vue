import Vue from 'vue';
import Router from 'vue-router';
import LayoutDefault from '@/layouts/default.vue';
import LayoutLogin from '@/layouts/login.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            component: LayoutDefault,
            children: [
                {
                    path: '/',
                    alias: '/home',
                    name: 'home',
                    component: () => import('@/views/home/Home.vue'),
                },
                {
                    path: '/about',
                    name: 'about',
                    component: () => import('@/views/home/About.vue'),
                },
                // errorPage
                {
                    path: '/401',
                    alias: '/notauth',
                    name: 'notauth',
                    component: () => import('@/views/error/401.vue'),
                },
                {
                    path: '/404',
                    alias: '/notfound',
                    name: 'notfound',
                    component: () => import('@/views/error/404.vue'),
                },
            ],
        },
        {
            path: '',
            component: LayoutLogin,
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/user/Login.vue'),
                },
                {
                    path: '/signup',
                    name: 'signup',
                    component: () => import('@/views/user/Signup.vue'),
                },
                {
                    path: '/userLicense',
                    name: 'userLicense',
                    component: () => import('@/views/user/UserLicense.vue'),
                },
            ],
        },
        {
            path: '*',
            redirect: '/404',
        },
    ],
});
