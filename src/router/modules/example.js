// 自主采购
import Layout from '@/components/Layout';

const example = {
  path: '/example',
  name: 'Example',
  redirect: { name: 'EditTable' },
  meta: { title: '组件示例', icon: 'el-icon-folder' },
  component: Layout,
  children: [
    {
      path: 'edit-table',
      name: 'EditTable',
      meta: { title: '编辑表格' },
      component: () => import(`@/views/Example/edit-table.vue`)
    },
    {
      path: 'edit-tree',
      name: 'PageTree',
      meta: { title: '编辑树' },
      component: () => import(`@/views/Example/tree.vue`)
    },
    {
      path: 'edit-form',
      name: 'EditForm',
      meta: { title: '多表单验证' },
      component: () => import(`@/views/Example/edit-form/form.vue`)
    },
    {
      path: 'virtual',
      name: 'Virtual',
      meta: { title: '虚列列表' },
      component: () => import(`@/views/Example/virtual.vue`)
    },
    {
      path: 'table',
      name: 'TableComp',
      meta: { title: '表格组件' },
      component: () => import(`@/views/Example/table.vue`)
    },
    {
      path: 'area-map',
      name: 'AreaMap',
      meta: { title: '地图绘制' },
      component: () => import(`@/views/Example/area-map.vue`)
    }
  ]
};

export default example;
