import { createStore } from 'vuex';
import app from './modules/app';
import menu from './modules/menu';
import user from './modules/user';

export default createStore({
  modules: {
    app,
    menu,
    user
  },
  getters: {
    collapsed: state => state.app.collapsed,
    menuList: state => state.menu.menuList,
    mapMenuList: state => state.menu.mapMenuList
  }
});
