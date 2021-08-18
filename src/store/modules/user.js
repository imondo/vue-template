const state = () => ({
  info: null
});

const mutations = {
  SET_USER(state, user) {
    state.info = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  }
};

const actions = {
  Login({ commit }, form) {
    commit('SET_USER', form);
  },
  GetUser() {},
  Logout({ commit }) {
    commit('SET_USER', null);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
