<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
/* eslint-disable one-var */
// import axios from 'axios'
import echarts from 'echarts/lib/echarts'
import resize from './mixins/resize'

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'

import 'echarts/lib/chart/map'
import 'echarts/lib/component/visualMap'
import 'echarts/map/js/china.js'

import loadData from './map.js'

export default {
  name: 'Heatmap',
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
      // axios.get('/examples/data/asset/geo/HK.json').then(res => {
      //   echarts.registerMap('HK', res.data)
      //   })
      this.chart.setOption({
        title: {
          text: '全国降水量',
          left: 'center'
          // subtext: '气温密度密度数据来自Wikipedia',
          // sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          right: '20%',
          top: 0,
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
          show: true,
          borderColor: '#333'
        },
        visualMap: {
          // type: 'piecewise',
          min: -100,
          max: 400,
          // splitNumber: 10,
          align: 'top',
          itemHeight: 350,
          // text: ['High', 'Low'],
          right: '10%',
          bottom: '10%',
          realtime: false,
          calculable: true,
          inRange: {
            color: [
              '#e74c3c',
              '#e67e22',
              '#f39c12',
              '#f1c40f',
              '#1abc9c',
              '#16a085',
              '#3498db',
              '#2980b9'
            ]
          }
          // formatter: (value, value2) => `${value} ~ ${value2}`
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#333'
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            formatter: '{value} ° E'
          },
          data: ['106', '108', '110', '112', '114', '116', '118']
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#333'
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            formatter: '{value} ° N'
          },
          data: ['18', '19', '20', '21', '22', '23', '24']
        },
        geo: {
          // 这个是重点配置区
          map: 'china', // china 表示中国地图
          roam: true,
          layoutCenter: ['50%', '50%'],
          layoutSize: '80%',
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#fff',
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#fff',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo' // 对应上方配置
          },
          {
            name: '',
            type: 'heatmap',
            data: loadData,
            coordinateSystem: 'geo',
            emphasis: {
              itemStyle: {
                borderColor: '#333',
                borderWidth: 1
              }
            },
            progressive: 1000,
            animation: false
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
