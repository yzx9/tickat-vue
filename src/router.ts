import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from '@/layouts/default.vue'
import LoginLayout from '@/layouts/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: DefaultLayout,
      children: [
        {
          path: '/index',
          alias: '',
          name: 'Index',
          component: () => import('@/views/home/Index.vue')
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('@/views/home/About.vue')
        },
        // errorPage
        {
          path: '/401',
          name: 'NotAuth',
          component: () => import('@/views/error/401.vue')
        },
        {
          path: '/404',
          name: 'NotFound',
          component: () => import('@/views/error/404.vue')
        }
      ]
    },
    {
      path: '',
      component: LoginLayout,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/views/user/Login.vue')
        },
        {
          path: '/signup',
          name: 'Signup',
          component: () => import('@/views/user/Signup.vue')
        },
        {
          path: '/UserLicense',
          name: 'UserLicense',
          component: () => import('@/views/user/UserLicense.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'NotFound' }
    }
  ]
})
