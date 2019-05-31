import App from '@/App.vue';

export function importView(view) {
  return () => import(`@/views${view}`);
}

import { homePage, report } from './report';

console.log(report);

const routes = [
  {
    path: '/'
  },
  {
    path: '/pms',
    name: 'pms',
    component: App,
    children: [homePage, report]
  }
];

export default routes;
