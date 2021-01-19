export const LOADING_SET = 'LOADING_SET'
export const LOADING_CHANGE = 'LOADING_CHANGE'
export const LOADING_RESET = 'LOADING_RESET'

/* eslint-disable no-param-reassign */
export default {
  state: {},
  mutations: {
    [LOADING_SET](state, data) {
      if (!data.isModule) {
        state = {}
      }
      const { names } = data
      if (names instanceof Array) {
        names.map(item => this._vm.$set(this.state.loadingServer, item, false))
      } else {
        this._vm.$set(this.state.loadingServer, names, false)
      }
    },
    [LOADING_CHANGE](state, data) {
      Object.assign(state, data)
    },
    [LOADING_RESET](state) {
      Object.keys(state).map(k => {
        state[k] = false
        return true
      })
    }
  },
  actions: {
    [LOADING_SET]({ commit }, data) {
      commit(LOADING_SET, data)
    },
    [LOADING_CHANGE]({ commit }, data) {
      commit(LOADING_CHANGE, data)
    },
    [LOADING_RESET]({ commit }) {
      commit(LOADING_RESET)
    }
  }
}
