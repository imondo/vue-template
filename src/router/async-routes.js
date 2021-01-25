import Layout from '@/layout'

const asyncRoutes = [
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    redirect: '/dashboard',
    meta: {},
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '综合首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-tools'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '账户管理',
          icon: 'el-icon-user-solid'
        },
        component: r =>
          require.ensure(
            [],
            () => r(require('@/views/system/user.vue')),
            'system'
          )
      }, // 账户管理
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'el-icon-s-custom'
        },
        component: r =>
          require.ensure(
            [],
            () => r(require('@/views/system/role.vue')),
            'system'
          )
      } // 角色管理
    ]
  },
  {
    path: '/weatherMethod',
    component: Layout,
    name: 'weatherMethod',
    meta: { title: '方法', icon: 'el-icon-folder' },
    children: [
      {
        path: 'ysz',
        name: 'ysz',
        component: () => import('@/views/weatherMethod/ysz'),
        meta: { title: '原始值', icon: 'el-icon-s-marketing' }
      },
      {
        path: 'dzz',
        name: 'dzz',
        component: () => import('@/views/weatherMethod/dzz'),
        meta: { title: '订正值', icon: 'el-icon-s-marketing' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default asyncRoutes
