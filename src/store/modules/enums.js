// 枚举数据
const state = {
  // 气候类型
  climateTypes: [
    {
      label: '降水',
      value: 'precipitation'
    },
    {
      label: '平均气温',
      value: 'temperature_avg'
    },
    {
      label: '最低气温',
      value: 'temperature_min'
    },
    {
      label: '最高气温',
      value: 'temperature_max'
    }
  ],
  // 数据源
  dataSource: [
    {
      label: 'ECMWF',
      value: 'ECMWF'
    },
    {
      label: 'NCC',
      value: 'NCC'
    },
    {
      label: 'NCEP',
      value: 'NCEP'
    },
    {
      label: 'ECMWF2',
      value: 'ECMWF2',
      has: ['forecast_ai', 'score_ai', 'score_tcc_ai']
    },
    {
      label: 'NCC2',
      value: 'NCC2',
      has: ['forecast_ai', 'score_ai', 'score_tcc_ai']
    },
    {
      label: 'NCEP2',
      value: 'NCEP2',
      has: ['forecast_ai', 'score_ai', 'score_tcc_ai']
    },
    {
      label: 'REANALYSIS',
      value: 'REANALYSIS',
      has: ['forecast_ai', 'score_ai', 'score_tcc_ai']
    }
  ],
  // 预报方法
  modelTypeData: [
    {
      label: '卷积神经网络',
      value: 'CNN'
    },
    {
      label: '线性回归',
      value: 'LR'
    },
    {
      label: '随机森林',
      value: 'RF'
    },
    {
      label: '贝叶斯ARD',
      value: 'ARD'
    },
    {
      label: '高斯过程回归',
      value: 'GP'
    },
    {
      label: '集成方法',
      value: 'ENSEMBLE'
    }
  ],
  // 预报区域
  regionData: [
    {
      label: '华南',
      value: 'southchina'
    },
    {
      label: '中国',
      value: 'china'
    },
    {
      label: '广东',
      value: 'guangdong'
    }
  ],
  // 具体预报
  scaleAbbs: {
    year: [
      {
        label: '全年',
        value: 'Year'
      }
    ]
  },
  // 预报结果类型
  forecastTypes: [
    {
      label: '站点值',
      value: 'site_value'
    },
    {
      label: '站点距平',
      value: 'site_anomaly'
    },
    {
      label: '格点值',
      value: 'grid_value',
      excludes: ['forecast_ai', 'score_ai', 'score_tcc_ai']
    },
    {
      label: '格点距平',
      value: 'grid_anomaly',
      excludes: ['forecast_ai', 'score_ai', 'score_tcc_ai']
    }
  ]
}

const scaleAbbs = {
  month: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],
  quarter: {
    'Q1': '第一季度',
    'Spr': '春季',
    'Q2': '第二季度',
    'Pre': '前汛期',
    'Mid': '盛夏季',
    'Sum': '夏季',
    'Post': '后汛期',
    'Aut': '秋季',
    'Q4': '第四季度',
    'Win': '冬季'
  }
}

state.scaleAbbs.month = scaleAbbs.month.reduce((arr, v, i) => {
  arr.push({
    label: `${i + 1}月`,
    value: v
  })
  return arr
}, [])

state.scaleAbbs.quarter = Object.keys(scaleAbbs.quarter).reduce((arr, key, i) => {
  arr.push({
    label: scaleAbbs.quarter[key],
    value: key
  })
  return arr
}, [])

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
