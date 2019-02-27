import router from '@/router'
import Vuex, { Store as VuexStore } from 'vuex'
import { store } from '@/store'

const unAuthPath = ['Login', 'Signup', 'square', 'NotFound']

router.beforeEach((to, from, next) => {
  const isAuth = store.getters['Auth/isAuth'] as boolean
  const isAuthPath = to.name && unAuthPath.indexOf(to.name) === -1

  // 未登录访问AuthPath
  if (!isAuth && isAuthPath) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // 登录后访问Login
  if (isAuth && to.name === 'Login') {
    next({ name: 'Index' })
  }

  next()
})
