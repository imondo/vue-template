import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'admin',
    component: () => import('../layouts/index.jsx'),
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/404',
    component: () => import('../components/NotFound/index.vue'),
    meta: {
      title: '404'
    }
  }
];

const base = import.meta.env.BASE_URL;

export default createRouter({
  history: createWebHistory(base),
  routes
});
