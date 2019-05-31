const user = {
  state: {
    menu: [],
    token: null,
    info: {}
  },
  mutations: {
    SET_MENU: (state, menu) => {
      state.menu = [...menu];
    }
  },
  actions: {
    async GetMenu({ commit, state }, data) {
      if (state.menu.length) return state.menu;
      commit('SET_MENU', data);
      return data;
    }
  }
};

export default user;
