import router from '@/router/router'
import { store } from '@/store'
import storageOperator from '@/utils/Storage'

const unAuthPath = ['Login', 'Signup', 'square', 'NotFound']

router.beforeEach((to, from, next) => {
  const isAuthPath = to.name && unAuthPath.indexOf(to.name) === -1
  let isAuth = store.getters['Auth/isAuth'] as boolean

  // 尝试通过本地验证登录
  if (!isAuth) {
    isAuth = StorageAuth()
  }

  // 未登录访问AuthPath
  if (!isAuth && isAuthPath) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // 登录后访问Login
  if (isAuth && to.name === 'Login') {
    return next({ name: 'Index' })
  }

  return next()
})

function StorageAuth() {
  const account: Account = storageOperator.get('Auth') as Account
  if (account) {
    store.commit('Auth/SET_AUTH', account)
    return true
  } else {
    return false
  }
}
