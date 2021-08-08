import { createRouter, createWebHashHistory } from 'vue-router';

import example from './example.js';

const routes = [
  {
    path: '/',
    component: () => import('../layouts/index.jsx'),
    redirect: {
      name: 'dashboard'
    },
    children: [
      ...example,
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../components/NotFound/index.vue')
      }
    ]
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});
