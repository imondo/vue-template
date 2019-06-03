const getters = {
  api: state => state.api,
  userInfo: state => state.user.info,
  menu: state => state.user.menu,
  token: state => state.user.token,
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes
};

export default getters;
