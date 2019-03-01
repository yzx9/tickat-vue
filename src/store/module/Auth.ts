import AccountModel from '@/models/Account'
import { Getters, Mutations, Actions, Module } from 'vuex-smart-module'
import Axios from 'axios'
import StorageOperator from '@/utils/Storage'

class AuthState {
  public account: AccountModel = new AccountModel(
    '0',
    'null',
    'images/avatars/default.jpg'
  )
}

class AuthGetters extends Getters<AuthState> {
  public get isAuth() {
    return this.state.account.id !== '0'
  }
}

class AuthMutations extends Mutations<AuthState> {
  public SET_AUTH(account: AccountModel) {
    this.state.account = account
  }
}

class AuthActions extends Actions<
  AuthState,
  AuthGetters,
  AuthMutations,
  AuthActions
> {
  public Login(payload: { username: string; password: string }) {
    return Axios.post('/api/login', payload).then(re => {
      if (re.data.type === 0) {
        this.commit('SET_AUTH', re.data.data as AccountModel)
      }
    })
  }
  public Logout() {
    this.commit(
      'SET_AUTH',
      new AccountModel('0', 'null', 'images/avatars/default.jpg')
    )
    StorageOperator.remove('Auth')
  }
}

export const Auth = new Module({
  state: AuthState,
  getters: AuthGetters,
  mutations: AuthMutations,
  actions: AuthActions
})
