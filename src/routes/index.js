import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'admin',
    component: () => import('../layouts/index.jsx'),
    redirect: '/dashboard',
    children: []
  },
  {
    path: '/404',
    component: () => import('../components/NotFound/index.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});
