import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import State from '@/store/State'
import Getters from '@/store/Getters'
import Mutations from '@/store/Mutations'
import Actions from '@/store/Actions'
import { Auth } from '@/store/module/Auth'
import { Pomodoro } from './module/Pomodoro'

Vue.use(Vuex)

const store = createStore(
  new Module({
    state: State,
    getters: Getters,
    mutations: Mutations,
    actions: Actions,
    modules: {
      Auth,
      Pomodoro
    }
  }),
  {
    strict: process.env.NODE_ENV !== 'production'
  }
)

export { store }
