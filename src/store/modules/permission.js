import { asyncRoutes, homePage } from '@/router/modules/routes';

/**
 * 通过路由path判断是否与当前用户权限匹配
 * @param permissionMenu
 * @param route
 */
function hasPermission(permissionMenu, route) {
  return (
    permissionMenu.findIndex(v => {
      const key = v.path || v;
      const sort = v.sort || '';
      route.sort = sort; // 排序
      return route.path.includes(key);
    }) > -1
  );
}

/**
 * 递归过滤异步路由表，返回符合用户权限的路由表
 * @param routes asyncRouterMap
 * @param permissionMenu
 */
function filterAsyncRouter(routes, permissionMenu) {
  const menu = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(permissionMenu, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(route.children, permissionMenu);
      }
      menu.push(tmp);
    }
  });
  return menu;
}

const permission = {
  state: {
    permissionList: [],
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_PERMISSION: (state, list) => {
      state.permissionList = [...list];
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = [...routes];
      state.routes = [homePage, ...routes];
    }
  },
  actions: {
    async GenerateRoutes({ dispatch, commit }, data) {
      const permissionList = await dispatch('GetMeunPermission', data);
      const routes = filterAsyncRouter(asyncRoutes, permissionList);
      commit('SET_ROUTES', routes);
    },
    // 遍历菜单获取Permission字段
    async GetMeunPermission({ commit }, data) {
      const permissionMenu = [];

      function getMenus(menuData) {
        menuData.forEach(e => {
          if (e.permission) {
            // 需要排序字段
            const { permission, sort } = e;
            const menuItem = { path: permission, sort };
            permissionMenu.push(menuItem);
          }
          if (e.children && Array.isArray(e.children)) {
            getMenus(e.children);
          }
        });
      }
      getMenus(data);
      commit('SET_PERMISSION', permissionMenu);
      return permissionMenu;
    }
  }
};

export default permission;
