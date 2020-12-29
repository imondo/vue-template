import { createRouter, createWebHashHistory } from 'vue-router';

import Layouts from '../layouts/index.vue';

const routes = [
  {
    path: '/',
    component: Layouts,
    children: [
      {
        path: '/',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/about',
        component: () => import('../views/About.vue')
      }
    ]
  }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});
