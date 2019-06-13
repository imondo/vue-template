import Layout from '@/components/Layout';
import { importViews } from './routes';

const report = {
  path: '/report',
  name: 'report',
  meta: { title: '申购上报' },
  component: Layout,
  children: [
    {
      path: 'project',
      name: 'Project',
      meta: { title: '项目立项' },
      component: importViews(`/About.vue`)
    },
    {
      path: 'projectdetail',
      name: 'ProjectDetail',
      meta: { title: '项目立项详情', activeMenu: 'Project', hidden: true },
      component: importViews(`/Home.vue`)
    },
    {
      path: 'agent',
      name: 'agent',
      meta: { title: '计划代录' },
      component: importViews(`/Home.vue`)
    }
  ]
};

export default report;
