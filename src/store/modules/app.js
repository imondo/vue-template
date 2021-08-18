const state = () => ({
  collapsed: false
});

const mutations = {
  SET_COLLAPSED(state) {
    state.collapsed = !state.collapsed;
  }
};

const actions = {
  SetCollapsed({ commit }) {
    commit('SET_COLLAPSED');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
