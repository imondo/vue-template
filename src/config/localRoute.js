const localRoutes = [
  {
    name: '申购上报',
    permission: 'report',
    children: [
      {
        name: '项目立项',
        permission: 'project'
      },
      {
        name: '计划代录',
        permission: 'agent'
      },
      {
        name: '计划审核',
        permission: 'planaudit'
      },
      {
        name: '确定单位',
        permission: 'unitsubmit'
      },
      {
        name: '申购汇总',
        permission: 'detailed'
      },
      {
        name: '项目完成',
        permission: 'complete'
      }
    ]
  },
  {
    name: '数据分包',
    permission: 'subpackage',
    children: [
      {
        name: '项目分包',
        permission: 'projectpackage'
      }
    ]
  },
  {
    name: '中标回填',
    permission: 'bidding',
    children: [
      {
        name: '中标信息',
        permission: 'bidinfo'
      }
    ]
  },
  {
    name: '分发验收',
    permission: 'distribute',
    children: [
      {
        name: '货物分发',
        permission: 'goodsdb'
      }
    ]
  },
  {
    name: '统计分析',
    permission: 'statistic',
    children: [
      {
        name: '资金流向',
        permission: 'moneyflow'
      },
      {
        name: '厂商统计',
        permission: 'vendorflow'
      },
      {
        name: '货物流向',
        permission: 'goodsflow'
      },
      {
        name: '单位汇总',
        permission: 'unitssummary'
      }
    ]
  }
];

export default localRoutes;
