import Layout from '@/components/Layout';

import report from './report';

export function importViews(view) {
  return () => import(`@/views${view}`);
}

export const asyncRoutes = [report]; // 权限认证菜单

// 首页
export const homePage = {
  path: '/index',
  name: 'Index',
  component: Layout,
  redirect: { name: 'Page' },
  meta: { hidden: true },
  children: [
    {
      path: 'page',
      name: 'Page',
      meta: { title: '首页' },
      component: importViews(`/Page.vue`)
    }
  ]
};

const routes = [homePage];

export default routes;
