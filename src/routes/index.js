import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../layouts/index.jsx'),
    redirect: {
      name: 'dashboard'
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/form',
        name: 'Form',
        component: () => import('../views/Form/index.vue')
      },
      {
        path: '/table',
        name: 'Table',
        component: () => import('../views/About.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../components/NotFound/index.jsx')
      }
    ]
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});
