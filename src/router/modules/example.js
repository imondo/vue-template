// 自主采购
import Layout from '@/components/Layout';

export function importViews(view) {
  return () => import(`@/views/Example${view}`);
}

const example = {
  path: '/example',
  name: 'Example',
  redirect: { name: 'EditTable' },
  meta: { title: '组件示例' },
  component: Layout,
  children: [
    {
      path: 'edit-table',
      name: 'EditTable',
      meta: { title: '编辑表格' },
      component: importViews(`/edit-table.vue`)
    },
    {
      path: 'edit-tree',
      name: 'PageTree',
      meta: { title: '编辑树' },
      component: importViews(`/tree.vue`)
    }
  ]
};

export default example;
