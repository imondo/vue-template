<template>
  <div class="map">
    <div>
      <el-button
        type="text"
        href="https://lbs.amap.com/api/javascript-api/guide/abc/prepare"
        target="_blank"
      >高德地图</el-button>
    </div>
    <div id="container1" class="container"></div>
    <div id="container2" class="container container2"></div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
export default {
  name: 'AreaMap',
  data() {
    return {
      map: null,
      polygons: []
    };
  },
  mounted() {
    this.$nextTick(async() => {
      await this.testMap();
      await this.mapUIArea();
    });
  },
  methods: {
    loadMapJs() {
      return new Promise(resolve => {
        const url = `https://webapi.amap.com/maps?v=1.4.15&key=0b7de3baf96b2093ca2ec54caaac39fa&plugin=AMap.DistrictSearch`;
        const jsApi = document.createElement('script');
        jsApi.src = url;
        document.head.appendChild(jsApi);
        jsApi.onload = function() {
          // eslint-disable-next-line no-undef
          resolve(AMap);
        };
      });
    },
    loadMapUIJs() {
      return new Promise(resolve => {
        const url = `https:///webapi.amap.com/ui/1.0/main.js?v=1.0.11`;
        const jsApi = document.createElement('script');
        jsApi.src = url;
        document.head.appendChild(jsApi);
        jsApi.onload = function() {
          // eslint-disable-next-line no-undef
          resolve(AMap);
        };
      });
    },
    async testMap() {
      const AMap = await this.loadMapJs();
      const map = new AMap.Map('container1', {
        resizeEnable: true,
        center: [116.397428, 39.90923] // 地图中心点
      });
      let { polygons } = this;
      AMap.plugin('AMap.DistrictSearch', () => {
        const districtSearch = new AMap.DistrictSearch({
          // 关键字对应的行政区级别，country表示国家
          level: 'district',
          // 显示下级行政区级数，1表示返回下一级行政区
          subdistrict: 1,
          extensions: 'all' // 返回行政区边界坐标组等具体信息
        });

        // 搜索所有省/直辖市信息
        districtSearch.search('朝阳区', function(status, result) {
          map.remove(polygons); // 清除上次结果
          polygons = [];
          var bounds = result.districtList
            ? result.districtList[0].boundaries
            : null;
          if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
              // 生成行政区划polygon
              var polygon = new AMap.Polygon({
                strokeWeight: 1,
                path: bounds[i],
                fillOpacity: 0.4,
                fillColor: '#80d8ff',
                strokeColor: '#0091ea'
              });
              polygons.push(polygon);
            }
          }
          map.add(polygons);
          map.setFitView(polygons); // 视口自适应
        });
      });
    },
    // UI 组件使用示例
    async mapUIArea() {
      await this.loadMapUIJs();
      const AMap = await this.loadMapJs();
      // 创建地图
      const map = new AMap.Map('container2', {
        zoom: 4
      });
      // just some colors
      const colors = [
        '#3366cc',
        '#dc3912',
        '#ff9900',
        '#109618',
        '#990099',
        '#0099c6',
        '#dd4477',
        '#66aa00',
        '#b82e2e',
        '#316395',
        '#994499',
        '#22aa99',
        '#aaaa11',
        '#6633cc',
        '#e67300',
        '#8b0707',
        '#651067',
        '#329262',
        '#5574a6',
        '#3b3eac'
      ];

      // eslint-disable-next-line no-undef
      AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], () => {
        // 创建一个实例
        var districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: true, // 打开事件支持
          map: map
        }));

        // 切换区域
        function switch2AreaNode(adcode, callback) {
          if (
            currentAreaNode &&
            '' + currentAreaNode.getAdcode() === '' + adcode
          ) {
            return;
          }

          loadAreaNode(adcode, function(error, areaNode) {
            if (error) {
              if (callback) {
                callback(error);
              }

              return;
            }

            currentAreaNode = window.currentAreaNode = areaNode;

            // 设置当前使用的定位用节点
            districtExplorer.setAreaNodesForLocating([currentAreaNode]);

            refreshAreaNode(areaNode);

            if (callback) {
              callback(null, areaNode);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  overflow: hidden;
}
.container {
  float: left;
  width: 350px;
  height: 250px;
}
.container2 {
  margin-left: 20px;
}
</style>
