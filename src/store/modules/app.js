/**
 * 项目业务无关状态可挂载
 */
const app = {
  state: {
    sidebar: {
      opened: false
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
    }
  },
  actions: {
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    }
  }
};

export default app;
