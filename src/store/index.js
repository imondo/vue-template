import { createStore } from 'vuex';
import app from './modules/app';
import permission from './modules/permission';

export default createStore({
  modules: {
    app,
    permission
  },
  getters: {
    collapsed: state => state.app.collapsed,
    menuList: state => state.permission.menuList,
    mapMenuList: state => state.permission.mapMenuList
  }
});
