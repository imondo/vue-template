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
    },
    {
      path: 'edit-form',
      name: 'EditForm',
      meta: { title: '多表单验证' },
      component: importViews(`/edit-form/form.vue`)
    },
    {
      path: 'virtual',
      name: 'Virtual',
      meta: { title: '虚列列表' },
      component: importViews(`/virtual.vue`)
    },
    {
      path: 'table',
      name: 'TableComp',
      meta: { title: '表格组件' },
      component: importViews(`/table.vue`)
    }
  ]
};

export default example;
