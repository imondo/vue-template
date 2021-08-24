const state = () => ({});

const mutations = {
  SET_LOADING(state, data) {
    const isObject = Object.prototype.toString.call(data) === '[object Object]';
    if (!isObject) {
      console.warn('data is not Object!');
      return;
    }
    Object.keys(data).forEach(key => {
      state[key] = data[key];
    });
  },
  CANCAL_LOADING: state => {
    Object.keys(state).forEach(key => {
      Reflect.deleteProperty(state, key);
    });
  }
};

const actions = {
  SetLoading({ commit }, data) {
    commit('SET_LOADING', data);
  },
  CancalLoading({ commit }, data) {
    commit('CANCAL_LOADING', data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
