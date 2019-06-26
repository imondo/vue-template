import Layout from '@/components/Layout';
import { importViews } from './routes';

const report = {
  path: '/budget',
  name: 'Budget',
  redirect: { name: 'Project' },
  meta: { title: '管理', icon: 'el-icon-s-operation' },
  component: Layout,
  children: [
    {
      path: 'project',
      name: 'Project',
      meta: { title: '立项' },
      component: importViews(`/Report.vue`)
    },
    {
      path: 'projectdetail',
      name: 'ProjectDetail',
      meta: { title: '项目立项详情', activeMenu: 'Project', hidden: true },
      component: importViews(`/Home.vue`)
    },
    {
      path: 'audit',
      name: 'Audit',
      meta: { title: '审核' },
      component: importViews(`/Home.vue`)
    }
  ]
};

export default report;
