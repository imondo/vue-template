export default [
  {
    key: 'dashboard',
    name: '首页',
    icon: 'ant-design:home'
  },
  {
    key: 'Base',
    name: '基础组件',
    icon: 'ant-design:align-center',
    children: [
      {
        key: 'Form',
        name: '表单',
        icon: 'ant-design:form'
      },
      {
        key: 'Table',
        name: '表格',
        icon: 'ant-design:table'
      }
    ]
  },
  {
    key: 'Advanced',
    name: '进阶组件',
    icon: 'ant-design:area-chart'
  }
];
