import Layout from '@/components/Layout';
import Login from '@/views/Login.vue';
import report from './report';
import example from './example'; // 组件示例

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
      meta: { title: '首页', icon: 'el-icon-s-home' },
      component: () => import('@/views/Page.vue')
    }
  ]
};

const login = {
  path: '/login',
  name: 'Login',
  component: Login
};

const routesConfig = [login, homePage, example];

export default routesConfig;
