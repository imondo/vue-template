import { useStore } from 'vuex';
import router from '@/routes';
import asyncRoutes from '@/routes/async-routes';

export function useMenu() {
  const { getters } = useStore();
  const menu = getters.menuList;
  return { menu };
}

export async function generateRoute(menus) {
  menus.forEach(menu => {
    const route = asyncRoutes.find(v => v.path === menu.path);
    console.log(route);
    if (route) {
      router.addRoute('admin', route);
    }
  });
  router.addRoute({
    path: '/:catchAll(.*)',
    redirect: '/404'
  });
  return;
}
