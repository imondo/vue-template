import router from '@/routes';
import { login, getUser } from '@/api/user';
import Storage from '@/utils/storage';
import { TOKEN_KEY } from '@/config/constants';

const storage = Storage();

const state = () => ({
  info: null,
  token: storage.get(TOKEN_KEY) || ''
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
  async Login({ commit, dispatch }, form) {
    const { token } = await login(form);
    if (token) {
      commit('SET_TOKEN', token);
      storage.set(TOKEN_KEY, token);
      await dispatch('GetUser');
    }
  },
  async GetUser({ commit }) {
    const user = await getUser();
    console.log('user ===> ', user);
    commit('SET_USER', user);
  },
  Logout({ commit }) {
    commit('SET_USER', null);
    router.push('/login');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
