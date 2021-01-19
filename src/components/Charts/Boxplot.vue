<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts/lib/echarts'
import resize from './mixins/resize'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'

import 'echarts/lib/chart/line'
import 'echarts/lib/chart/boxplot'

export default {
  name: 'Boxplot',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      echarts.dataTool = require('echarts/extension/dataTool')
      var data = echarts.dataTool.prepareBoxplotData([
        [
          850,
          740,
          900,
          1070,
          930,
          850,
          950,
          980,
          980,
          880,
          1000,
          980,
          930,
          650,
          760,
          810,
          1000,
          1000,
          960,
          960
        ],
        [
          960,
          940,
          960,
          940,
          880,
          800,
          850,
          880,
          900,
          840,
          830,
          790,
          810,
          880,
          880,
          830,
          800,
          790,
          760,
          800
        ],
        [
          880,
          880,
          880,
          860,
          720,
          720,
          620,
          860,
          970,
          950,
          880,
          910,
          850,
          870,
          840,
          840,
          850,
          840,
          840,
          840
        ],
        [
          890,
          810,
          810,
          820,
          800,
          770,
          760,
          740,
          750,
          760,
          910,
          920,
          890,
          860,
          880,
          720,
          840,
          850,
          850,
          780
        ],
        [
          890,
          840,
          780,
          810,
          760,
          810,
          790,
          810,
          820,
          850,
          870,
          870,
          810,
          740,
          810,
          940,
          950,
          800,
          810,
          870
        ]
      ])

      this.chart.setOption({
        title: [
          {
            text: '最高气温预报',
            left: 'center'
          }
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          right: '20%',
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          bottom: 0,
          left: 'center',
          data: ['历史均值', '分析']
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: data.axisData,
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
            show: false
          },
          axisLabel: {
            rotate: 45,
            formatter: '日期温度 {value}'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          // name: 'km/s minus 299,000',
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            formatter: '{value}°C'
          }
        },
        series: [
          {
            name: '历史均值',
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            smooth: true,
            lineStyle: {
              opacity: 0.5,
              color: '#e67e22'
            }
          },
          {
            name: '分析',
            type: 'boxplot',
            data: data.boxData,
            itemStyle: {
              color: '#16a085'
            },
            tooltip: {
              formatter: function(param) {
                return [
                  'Experiment ' + param.name + ': ',
                  'upper: ' + param.data[5],
                  'Q3: ' + param.data[4],
                  'median: ' + param.data[3],
                  'Q1: ' + param.data[2],
                  'lower: ' + param.data[1]
                ].join('<br/>')
              }
            }
          },
          {
            name: 'outlier',
            type: 'scatter',
            data: data.outliers
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
