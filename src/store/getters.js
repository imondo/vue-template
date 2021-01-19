const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menuFlat: state => state.menu.menuFlat,
  menu: state => state.menu,
  loadingServer: state => state.loadingServer,
  permission_routes: state => state.permission.routes,
  enums: state => state.enums
}
export default getters
