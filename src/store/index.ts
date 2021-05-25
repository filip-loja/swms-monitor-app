import Vuex from 'vuex'
import state from 'src/store/state'
import * as mutations from 'src/store/mutations'
import * as actions from 'src/store/actions'
import * as getters from 'src/store/getters'
import { StateRoot } from 'src/store/store'
import Vue from 'vue'

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface extends StateRoot {
  example?: unknown;
}

Vue.use(Vuex)

export default new Vuex.Store<StateInterface>({
  modules: {
    // example
  },
  state,
  mutations,
  actions,
  getters,

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: !!process.env.DEBUGGING
})
