import Layout from '@/components/Layout';
import { importView } from './routes';

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
      component: importView(`/About.vue`)
    },
    {
      path: 'projectdetail',
      name: 'ProjectDetail',
      meta: { title: '项目立项详情', parentName: 'Project', hidden: true },
      component: importView(`/Home.vue`)
    },
    {
      path: 'agent',
      name: 'agent',
      meta: { title: '计划代录' },
      component: importView(`/Home.vue`)
    }
  ]
};

export default report;
