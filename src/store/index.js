import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import menu from './modules/menu'
import permission from './modules/permission'
import loadingServer from './modules/loading-server'
import enums from './modules/enums'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    menu,
    permission,
    loadingServer,
    enums
  },
  getters
})

export default store
