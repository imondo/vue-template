import { createStore } from 'vuex';
import app from './modules/app';
import menu from './modules/menu';
import user from './modules/user';
import loading from './modules/loading';

export default createStore({
  modules: {
    app,
    menu,
    user,
    loading
  },
  getters: {
    collapsed: state => state.app.collapsed,
    menuList: state => state.menu.menuList,
    mapMenuList: state => state.menu.mapMenuList,
    token: state => state.user.token,
    user: state => state.user.info
  }
});
