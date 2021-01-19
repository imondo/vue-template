const geoCoord = {
  甘肃: [103.73, 36.03],
  青海: [101.74, 36.56],
  四川: [104.06, 30.67],
  河北: [114.48, 38.03],
  云南: [102.73, 25.04],
  贵州: [106.71, 26.57],
  湖北: [114.31, 30.52],
  河南: [113.65, 34.76],
  山东: [117, 36.65],
  江苏: [118.78, 32.04],
  安徽: [117.27, 31.86],
  浙江: [120.19, 30.26],
  江西: [115.89, 28.68],
  福建: [119.3, 26.08],
  广东: [113.23, 23.16],
  湖南: [113, 28.21],
  海南: [110.35, 20.02],
  辽宁: [123.38, 41.8],
  吉林: [125.35, 43.88],
  黑龙江: [126.63, 45.75],
  山西: [112.53, 37.87],
  陕西: [108.95, 34.27],
  台湾: [121.3, 25.03],
  北京: [116.46, 39.92],
  上海: [121.48, 31.22],
  重庆: [106.54, 29.59],
  天津: [117.2, 39.13],
  内蒙古: [111.65, 40.82],
  广西: [108.33, 22.84],
  西藏: [91.11, 29.97],
  宁夏: [106.27, 38.47],
  新疆: [87.68, 43.77],
  香港: [114.17, 22.28],
  澳门: [113.54, 22.19]
}

var convertData = function(data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var _geoCoord = geoCoord[data[i].name]
    if (_geoCoord) {
      res.push(_geoCoord.concat(data[i].value))
    }
  }
  console.log(res)
  return res
}

var loadData = convertData([
  { name: '甘肃', value: -73 },
  { name: '青海', value: 274 },
  { name: '四川', value: 506 },
  { name: '河北', value: 548 },
  { name: '云南', value: -73 },
  { name: '贵州', value: -771 },
  { name: '湖北', value: 131 },
  { name: '河南', value: 21465 },
  { name: '山东', value: 318 },
  { name: '江苏', value: -78 },
  { name: '安徽', value: 17 },
  { name: '浙江', value: 119 },
  { name: '江西', value: 69 },
  { name: '福建', value: 203 },
  { name: '广东', value: 423 },
  { name: '湖南', value: 114 },
  { name: '海南', value: 135 },
  { name: '辽宁', value: 438 },
  { name: '吉林', value: 335 },
  { name: '黑龙江', value: 63 },
  { name: '山西', value: 53 },
  { name: '陕西', value: 95 },
  { name: '台湾', value: 23 },
  { name: '北京', value: -46 },
  { name: '上海', value: 128 },
  { name: '重庆', value: 154 },
  { name: '天津', value: 182 },
  { name: '内蒙古', value: 265 },
  { name: '广西', value: 33 },
  { name: '西藏', value: -111 },
  { name: '宁夏', value: 177 },
  { name: '新疆', value: 88 },
  { name: '香港', value: 115 },
  { name: '澳门', value: 14 }
])

export default loadData
