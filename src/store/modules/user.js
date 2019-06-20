import { getToken, removeToken } from '@/utils/auth';
import { getUser } from '@/api/user';

const user = {
  state: {
    menu: [],
    token: null,
    info: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.info = { ...user };
    },
    SET_MENU: (state, menu) => {
      state.menu = [...menu];
    },
    LOGOUT: state => {
      state.info = null;
      state.token = null;
      state.menu = [];
    }
  },
  actions: {
    async getToken({ commit, state }) {
      if (state.token) return state.token;
      const token = await getToken();
      const { access_token } = token;
      const tokenObj = access_token ? token : null;
      commit('SET_TOKEN', tokenObj);
      return tokenObj;
    },
    async GetUser({ commit }) {
      getUser().then(res => {
        console.log(res);
      });
      commit('SET_USER', { name: 'pms' });
      return { name: 'pms' };
    },
    async GetMenu({ commit, state }, data) {
      if (state.menu.length) return state.menu;
      commit('SET_MENU', data);
      return data;
    },
    async FeLogout({ dispatch, commit }) {
      await dispatch('ClearToken');
      commit('LOGOUT');
      return true;
    },
    // 清理token
    async ClearToken() {
      await removeToken();
      return true;
    },
    async Logout({ dispatch, rootGetters }) {
      await dispatch('FeLogout');
      window.location.href = rootGetters.api.IPRTAL_LOGOUT_HREF;
    }
  }
};

export default user;
