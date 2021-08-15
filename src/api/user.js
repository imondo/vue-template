export function getMenu() {
  return Promise.resolve([
    {
      id: 1,
      pid: 0,
      path: '/dashboard',
      name: '首页',
      icon: 'el-icon-s-home'
    },
    {
      id: 2,
      pid: 0,
      path: '/base',
      name: '基础组件',
      icon: 'el-icon-setting'
    },
    {
      id: '2-1',
      pid: 2,
      path: '/form',
      name: '多表单验证'
    },
    {
      id: '2-2',
      pid: 2,
      path: '/table/list',
      name: '表格'
    },
    {
      id: 3,
      pid: 0,
      path: '/advanced',
      name: '进阶组件',
      icon: 'el-icon-data-line'
    }
  ]);
}
