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
    // redirect: '/weatherMethod/ysz',
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

  {
    path: '/stage',
    component: Layout,
    // redirect: '/stage/stage-zgw',
    name: 'stage',
    meta: { title: '延伸期预报', icon: 'el-icon-data-analysis' },
    children: [
      {
        path: 'stage-zgw',
        name: 'stage-zgw',
        component: () => import('@/views/weatherMethod/ysz'),
        meta: { title: '最高温', icon: 'el-icon-s-marketing' },
        children: [
          {
            path: 'stage-zgw-ysz',
            name: 'stage-zgw-ysz',
            meta: { title: '原始值', icon: 'el-icon-s-marketing' }
          },
          {
            path: 'stage-zgw-cdf',
            name: 'stage-zgw-cdf',
            meta: { title: 'CDF-t订正值', icon: 'el-icon-s-marketing' }
          }
        ]
      },
      {
        path: 'stage-zdw',
        name: 'stage-zdw',
        component: () => import('@/views/weatherMethod/dzz'),
        meta: { title: '最低温', icon: 'el-icon-s-marketing' },
        children: [
          {
            path: 'stage-zdw-ysz',
            name: 'stage-zdw-ysz',
            meta: { title: '原始值', icon: 'el-icon-s-marketing' }
          },
          {
            path: 'stage-zdw-cdf',
            name: 'stage-zdw-cdf',
            meta: { title: 'CDF-t订正值', icon: 'el-icon-s-marketing' }
          }
        ]
      },
      {
        path: 'stage-mqw',
        name: 'stage-mqw',
        component: () => import('@/views/weatherMethod/dzz'),
        meta: { title: '2米气温', icon: 'el-icon-s-marketing' },
        children: [
          {
            path: 'stage-mqw-ysz',
            name: 'stage-mqw-ysz',
            meta: { title: '原始值', icon: 'el-icon-s-marketing' }
          },
          {
            path: 'stage-mqw-cdf',
            name: 'stage-mqw-cdf',
            meta: { title: 'CDF-t订正值', icon: 'el-icon-s-marketing' }
          }
        ]
      }
    ]
  },

  {
    path: '/history',
    component: Layout,
    // redirect: '/history/zgw',
    name: 'history',
    meta: { title: '历史同期比较', icon: 'el-icon-box' },
    children: [
      {
        path: 'zgw',
        name: 'zgw',
        component: () => import('@/views/weatherMethod/ysz'),
        meta: { title: '最高温', icon: 'el-icon-s-marketing' },
        children: [
          {
            path: 'zgw-ysz',
            name: 'zgw-ysz',
            meta: { title: '原始值', icon: 'el-icon-s-marketing' }
          },
          {
            path: 'zgw-cdf',
            name: 'zgw-cdf',
            meta: { title: 'CDF-t订正值', icon: 'el-icon-s-marketing' }
          }
        ]
      },
      {
        path: 'zdw',
        name: 'zdw',
        component: () => import('@/views/weatherMethod/dzz'),
        meta: { title: '最低温', icon: 'el-icon-s-marketing' },
        children: [
          {
            path: 'zdw-ysz',
            name: 'zdw-ysz',
            meta: { title: '原始值', icon: 'el-icon-s-marketing' }
          },
          {
            path: 'zdw-cdf',
            name: 'zdw-cdf',
            meta: { title: 'CDF-t订正值', icon: 'el-icon-s-marketing' }
          }
        ]
      },
      {
        path: 'mqw',
        name: 'mqw',
        component: () => import('@/views/weatherMethod/dzz'),
        meta: { title: '2米气温', icon: 'el-icon-s-marketing' },
        children: [
          {
            path: 'mqw-ysz',
            name: 'mqw-ysz',
            meta: { title: '原始值', icon: 'el-icon-s-marketing' }
          },
          {
            path: 'mqw-cdf',
            name: 'mqw-cdf',
            meta: { title: 'CDF-t订正值', icon: 'el-icon-s-marketing' }
          }
        ]
      }
    ]
  },

  {
    path: '/results',
    component: Layout,
    // redirect: '/results/forecast',
    name: 'results',
    meta: { title: '检验结果', icon: 'el-icon-receiving' },
    children: [
      {
        path: 'forecast',
        name: 'forecast',
        component: () => import('@/views/results/forecast'),
        meta: { title: '预报结果', icon: 'el-icon-s-marketing' },
        props: route => ({ type: route.meta.type }),
        children: [
          {
            path: 'fore-zn',
            name: 'fore-zn',
            sort: 1,
            meta: {
              title: '智能预报',
              icon: 'el-icon-s-marketing',
              type: 'simple'
            }
          },
          {
            path: 'fore-zn-new',
            name: 'fore-zn-new',
            sort: 2,
            meta: {
              title: '智能预报-新',
              icon: 'el-icon-s-marketing',
              type: 'forecast_ai'
            }
          },
          {
            path: 'fore-jc',
            name: 'fore-jc',
            sort: 3,
            meta: {
              title: '集成预报',
              icon: 'el-icon-s-marketing',
              type: 'weighted'
            }
          },
          {
            path: 'fore-gl',
            name: 'fore-gl',
            sort: 4,
            meta: { title: '概率预报', icon: 'el-icon-s-marketing', type: 'probability' }
          },
          {
            path: 'fore-zx',
            name: 'fore-zx',
            sort: 5,
            meta: { title: '置信区间预报', icon: 'el-icon-s-marketing', type: 'interval' }
          }
        ]
      },
      {
        path: 'score',
        name: 'score',
        component: () => import('@/views/results/score'),
        meta: { title: '评分检验结果', icon: 'el-icon-s-marketing' },
        props: route => ({ type: route.meta.type }),
        children: [
          {
            path: 'score-zn',
            name: 'score-zn',
            sort: 1,
            meta: { title: '智能预报评分', icon: 'el-icon-s-marketing', type: 'simple_score' }
          },
          {
            path: 'score-zn-new',
            name: 'score-zn-new',
            sort: 2,
            meta: { title: '智能预报评分-新', icon: 'el-icon-s-marketing', type: 'score_ai' }
          },
          {
            path: 'score-jc',
            name: 'score-jc',
            sort: 3,
            meta: { title: '集成预报评分', icon: 'el-icon-s-marketing', type: 'weighted_score' }
          },
          {
            path: 'score-gl',
            name: 'score-gl',
            sort: 4,
            meta: { title: '概率预报评分', icon: 'el-icon-s-marketing', type: 'proability_score' }
          },
          {
            path: 'score-zntcc',
            name: 'score-zntcc',
            sort: 5,
            meta: { title: '智能预报TCC检验', icon: 'el-icon-s-marketing', type: 'simple_score_tcc' }
          },
          {
            path: 'score-zntcc-new',
            name: 'score-zntcc-new',
            sort: 6,
            meta: { title: '智能预报TCC检验-新', icon: 'el-icon-s-marketing', type: 'score_tcc_ai' }
          },
          {
            path: 'score-jctcc',
            name: 'score-jctcc',
            sort: 7,
            meta: { title: '集成预报TCC检验', icon: 'el-icon-s-marketing', type: 'weighted_score_tcc' }
          }
        ]
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default asyncRoutes
