import { useStore } from 'vuex';
import router from '@/routes';
import asyncRoutes from '@/routes/async-routes';

export function useMenu() {
  const { getters } = useStore();
  const menu = getters.menuList;
  return { menu };
}

export function generateRoute(menus) {
  menus.forEach(menu => {
    const route = asyncRoutes.find(v => v.path === menu.path);
    if (route) {
      router.addRoute('admin', route);
    }
  });
}
