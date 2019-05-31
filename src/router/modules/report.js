import Layout from '@/components/Layout';
import { importView } from './routes';

export const homePage = {
  path: 'index',
  name: 'Index',
  redirect: { name: 'Page' },
  component: Layout,
  children: [
    {
      path: 'page',
      name: 'Page',
      meta: { title: '首页' },
      component: importView(`/Home.vue`)
    }
  ]
};

export const report = {
  path: 'report',
  name: 'report',
  meta: { title: '申购上报' },
  component: Layout,
  children: [
    {
      path: 'project',
      name: 'Project',
      meta: { title: '项目立项' },
      component: importView(`/About.vue`)
    }
  ]
};
