export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
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
  },
  {
    path: '/table/query',
    name: 'TableQuery',
    component: () => import('../example/Query.vue')
  },
  {
    path: '/tinymce',
    name: 'TinymceEdtior',
    component: () => import('../example/TinymceEditor.vue')
  }
];
