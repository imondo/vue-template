import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      collapsed: false
    };
  },
  mutations: {
    SET_COLLAPSED(state) {
      state.collapsed = !state.collapsed;
    }
  },
  actions: {
    SetCollapsed({ commit }) {
      commit('SET_COLLAPSED');
    }
  }
});
