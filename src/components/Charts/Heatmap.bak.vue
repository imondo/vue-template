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
import 'echarts/map/js/province/hunan.js'

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
          text: '湖南省降水量',
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
          type: 'piecewise',
          min: -100,
          max: 400,
          splitNumber: 10,
          align: 'top',
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
          },
          formatter: (value, value2) => `${value} ~ ${value2}`
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
          map: '湖南', // china 表示中国地图
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
              areaColor: null,
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
            name: '启动次数', // 浮动框的标题
            type: 'map',
            geoIndex: 0,
            data: [
              {
                name: '长沙市',
                value: 350
              },
              {
                name: '株洲市',
                value: 142
              },
              {
                name: '湘潭市',
                value: 44
              },
              {
                name: '衡阳市',
                value: -92
              },
              {
                name: '邵阳市',
                value: -100
              },
              {
                name: '岳阳市',
                value: 400
              },
              {
                name: '张家界市',
                value: 166
              },
              {
                name: '益阳市',
                value: -33
              },
              {
                name: '常德市',
                value: -48
              },
              {
                name: '娄底市',
                value: 255
              },
              {
                name: '郴州市',
                value: 232
              },
              {
                name: '永州市',
                value: -45
              },
              {
                name: '怀化市',
                value: 178
              },
              {
                name: '湘西土家族苗族自治州',
                value: 297
              }
            ]
          }
        ]
        // series: [
        //   {
        //     name: '香港18区人口密度',
        //     type: 'map',
        //     // mapType: 'HK', // 自定义扩展图表类型
        //     label: {
        //       show: true
        //     },
        //     data: [
        //       { name: '中西区', value: 20057.34 },
        //       { name: '湾仔', value: 15477.48 },
        //       { name: '东区', value: 31686.1 },
        //       { name: '南区', value: 6992.6 },
        //       { name: '油尖旺', value: 44045.49 },
        //       { name: '深水埗', value: 40689.64 },
        //       { name: '九龙城', value: 37659.78 },
        //       { name: '黄大仙', value: 45180.97 },
        //       { name: '观塘', value: 55204.26 },
        //       { name: '葵青', value: 21900.9 },
        //       { name: '荃湾', value: 4918.26 },
        //       { name: '屯门', value: 5881.84 },
        //       { name: '元朗', value: 4178.01 },
        //       { name: '北区', value: 2227.92 },
        //       { name: '大埔', value: 2180.98 },
        //       { name: '沙田', value: 9172.94 },
        //       { name: '西贡', value: 3368 },
        //       { name: '离岛', value: 806.98 }
        //     ],
        //     // 自定义名称映射
        //     nameMap: {
        //       'Central and Western': '中西区',
        //       Eastern: '东区',
        //       Islands: '离岛',
        //       'Kowloon City': '九龙城',
        //       'Kwai Tsing': '葵青',
        //       'Kwun Tong': '观塘',
        //       North: '北区',
        //       'Sai Kung': '西贡',
        //       'Sha Tin': '沙田',
        //       'Sham Shui Po': '深水埗',
        //       Southern: '南区',
        //       'Tai Po': '大埔',
        //       'Tsuen Wan': '荃湾',
        //       'Tuen Mun': '屯门',
        //       'Wan Chai': '湾仔',
        //       'Wong Tai Sin': '黄大仙',
        //       'Yau Tsim Mong': '油尖旺',
        //       'Yuen Long': '元朗'
        //     }
        //   }
        // ]
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
