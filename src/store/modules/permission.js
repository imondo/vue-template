import routesConfig, { asyncRoutes } from '@/router/modules/routes';

/**
 * 通过路由path判断是否与当前用户权限匹配
 * @param permissionMenu
 * @param route
 */
function hasPermission(permissionMenu, route) {
  const hasRoute = permissionMenu.find(p => p.path === route.path);
  if (hasRoute) {
    const { sort, name } = hasRoute;
    route.sort = sort;
    route.meta && (route.meta.title = name);
  }
  return (
    permissionMenu.findIndex(v => {
      const path = v.path || v;
      return route.path.includes(path);
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
      state.routes = [...routesConfig, ...routes];
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
            const { permission, sort, name } = e;
            const menuItem = { path: permission, sort, name };
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
