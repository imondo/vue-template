export default [
  {
    key: 'dashboard',
    name: '首页',
    icon: 'el-icon-s-home'
  },
  {
    key: 'Base',
    name: '基础组件',
    icon: 'el-icon-setting',
    children: [
      {
        key: 'Form',
        name: '多表单验证'
      },
      {
        key: 'Table',
        name: '表格'
      }
    ]
  },
  {
    key: 'Advanced',
    name: '进阶组件',
    icon: 'el-icon-data-line'
  }
];
