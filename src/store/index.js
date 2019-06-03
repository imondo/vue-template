import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import api from './modules/api';
import user from './modules/user';
import permission from './modules/permission';
import loading from './modules/loading';

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  modules: {
    api,
    user,
    permission,
    loading
  }
});
