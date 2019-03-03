import State from '@/store/State'
import { Mutations } from 'vuex-smart-module'

export default class AppMutations extends Mutations<State> {
  public SET_CLIENT_WIDTH(payload: { width: number }) {
    this.state.clientWidth = payload.width
  }
  public SET_CLIENT_HEIGHT(payload: { height: number }) {
    this.state.clientHeight = payload.height
  }
}
