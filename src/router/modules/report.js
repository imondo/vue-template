import Layout from '@/components/Layout';

const report = {
  path: '/budget',
  name: 'Budget',
  redirect: { name: 'Project' },
  meta: { title: '测试', icon: 'el-icon-folder' },
  component: Layout,
  children: [
    {
      path: 'project',
      name: 'Project',
      meta: { title: '测试一' },
      component: () => import(`@/views/Report.vue`)
    },
    {
      path: 'projectdetail',
      name: 'ProjectDetail',
      meta: { title: '测试一详情', activeMenu: 'Project', hidden: true },
      component: () => import(`@/views/Home.vue`)
    },
    {
      path: 'audit',
      name: 'Audit',
      meta: { title: '测试二' },
      component: () => import(`@/views/Home.vue`)
    }
  ]
};

export default report;
