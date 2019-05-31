const localRoutes = [
  {
    name: '申购上报',
    href: 'report',
    children: [
      {
        name: '项目立项',
        href: 'project'
      },
      {
        name: '计划代录',
        href: 'agent'
      },
      {
        name: '计划审核',
        href: 'planaudit'
      },
      {
        name: '确定单位',
        href: 'unitsubmit'
      },
      {
        name: '申购汇总',
        href: 'detailed'
      },
      {
        name: '项目完成',
        href: 'complete'
      }
    ]
  },
  {
    name: '数据分包',
    href: 'subpackage',
    children: [
      {
        name: '项目分包',
        href: 'projectpackage'
      }
    ]
  },
  {
    name: '中标回填',
    href: 'bidding',
    children: [
      {
        name: '中标信息',
        href: 'bidinfo'
      }
    ]
  },
  {
    name: '分发验收',
    href: 'distribute',
    children: [
      {
        name: '货物分发',
        href: 'goodsdb'
      }
    ]
  },
  {
    name: '统计分析',
    href: 'statistic',
    children: [
      {
        name: '资金流向',
        href: 'moneyflow'
      },
      {
        name: '厂商统计',
        href: 'vendorflow'
      },
      {
        name: '货物流向',
        href: 'goodsflow'
      },
      {
        name: '单位汇总',
        href: 'unitssummary'
      }
    ]
  }
];

export default localRoutes;
