export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../example/Home.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../example/Form/index.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../example/Table.vue')
  }
];
