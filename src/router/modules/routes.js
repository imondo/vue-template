import homePage from './home';
import report from './report';

export function importView(view) {
  return () => import(`@/views${view}`);
}

export const asyncRoutes = [report]; // 权限认证菜单

const routes = [homePage];

export default routes;
