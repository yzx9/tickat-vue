import { Actions } from 'vuex-smart-module'
import State from '@/store/State'
import Getters from '@/store/Getters'
import Mutations from '@/store/Mutations'

export default class AppActions extends Actions<
  State,
  Getters,
  Mutations,
  AppActions
> {}
