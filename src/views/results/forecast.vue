<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="query" class="query-form">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="预报年份：">
              <el-date-picker
                v-model="query.year"
                type="year"
                format="yyyy"
                value-format="yyyy"
                :clearable="false"
                placeholder="选择年"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="起报月份：">
              <el-date-picker
                v-model="query.start_date"
                type="month"
                format="yyyyMM"
                value-format="yyyyMM"
                placeholder="选择月"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="预报模式：">
              <el-select v-model="query.data_source" placeholder="预报模式">
                <el-option
                  v-for="(item, index) in dataSource"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="预报数据：">
              <el-select v-model="query.forecast_type" placeholder="预报数据">
                <el-option
                  v-for="(item, index) in forecastTypes"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="气候类型：">
              <el-select v-model="query.climate_type" placeholder="气候类型">
                <el-option
                  v-for="(item, index) in enums.climateTypes"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="预报尺度：">
              <SelectScalebb
                v-model="query.scale_abb"
                @change="onChangeScaleabb"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="type === 'forecast_ai'" :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="预报方法：">
              <el-select v-model="query.model_type" placeholder="预报方法">
                <el-option
                  v-for="(item, index) in enums.modelTypeData"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="type === 'forecast_ai'" :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="预报区域：">
              <el-select v-model="query.region" placeholder="预报区域">
                <el-option
                  v-for="(item, index) in enums.regionData"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
              <el-button v-if="type === 'forecast_ai'" type="primary" icon="el-icon-sort" @click="changeImgTabel">切换</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="showImg" v-loading="listLoading" class="app-content">
      <template v-if="images.length">
        <el-row>
          <template v-for="(item, index) in images">
            <el-col :key="index" :span="images.length > 1 ? 12 : 24">
              <el-image
                :src="`${defaultSetting.imgUrl}/${item}`"
                fit="contain"
                style="width: 100%; height: 600px; text-align: center;"
              ></el-image>
            </el-col>
          </template>
        </el-row>
      </template>
      <div v-else class="el-table__empty-block">
        <span class="el-table__empty-text">暂无数据</span>
      </div>
    </el-card>
    <el-card v-else class="app-content">
      <BaseTable v-loading="listLoading" :columns="columns" :data="list" />
    </el-card>
  </div>
</template>

<script>
import mixins from './mixins'
import defaultSetting from '@/settings'
import { getForecast, getNewForecast } from '@/api'
import BaseTable from '@/components/BaseTable'
const tcc = [
  {
    label: '站点编号',
    prop: 'code'
  },
  {
    label: '指标值',
    prop: 'TCC'
  }
]
export default {
  name: 'Forecast',
  components: { BaseTable },
  mixins: [mixins],
  data() {
    return {
      list: [],
      images: [],
      defaultSetting
    }
  },
  computed: {
    columns() {
      const columns = {
        forecast_ai: tcc
      }
      return columns[this.type]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const params = this.getParams()
      if (this.type === 'forecast_ai') {
        getNewForecast(this.type, params)
          .then(response => {
            if (response.state === 1) {
              this.images = response.images
              this.list = this.formatData(response.data)
            } else {
              this.$message.error(response.message)
            }
            this.listLoading = false
          })
          .catch(() => {
            this.listLoading = false
          })
      } else {
        getForecast(this.type, params)
          .then(response => {
            if (response.state === 1) {
              this.images = response.data
            } else {
              this.$message.error(response.message)
            }
            this.listLoading = false
          })
          .catch(() => {
            this.listLoading = false
          })
      }
    },
    formatData(data) {
      const ary = []
      const { cols, vals } = data
      cols.forEach((item, idx) => {
        const o = {}
        o.code = item
        o['TCC'] = vals[0][idx]
        ary.push(o)
      })

      return ary
    }
  }
}
</script>

<style lang="scss">
.el-icon-sort {
  transform: rotate(90deg);
}
</style>
