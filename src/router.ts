import Vue from 'vue';
import Router from 'vue-router';
// 首页
import Home from './views/home/Home.vue';
// 关于
import About from '@/views/home/About.vue';
// 登录注册
import Login from '@/views/user/Login.vue';
import Signup from '@/views/user/Signup.vue';
import UserLicense from '@/views/user/UserLicense.vue';
// Error
import NotFound from '@/views/error/404.vue';
import NotAuth from '@/views/error/401.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            alias: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
            component: About,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
        },
        {
            path: '/userLicense',
            name: 'userLicense',
            component: UserLicense,
        },
        {
            path: '/401',
            alias: '/notauth',
            name: 'notauth',
            component: NotAuth,
        },
        {
            path: '/404',
            alias: '/notfound',
            name: 'notfound',
            component: NotFound,
        },
        {
            path: '*',
            redirect: '/404',
        },
    ],
});
