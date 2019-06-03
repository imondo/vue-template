import Layout from '@/components/Layout';
import { importView } from './routes';

const homePage = {
  path: '/index',
  name: 'Index',
  component: Layout,
  meta: { hidden: true },
  children: [
    {
      path: '',
      meta: { title: '首页' },
      component: importView(`/Home.vue`)
    }
  ]
};

export default homePage;
