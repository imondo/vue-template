<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true" :model="query" class="query-form">
        <el-row :gutter="24">
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
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="预报步长：">
              <el-input-number
                v-model="query.time_step"
                :step="1"
                :precision="0"
                :min="1"
                step-strictly
                controls-position="right"
                label="预报步长"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col v-if="type === 'score_ai' || type === 'score_tcc_ai'" :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
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
          <el-col v-if="type === 'score_ai' || type === 'score_tcc_ai'" :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
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
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
              <el-button v-if="type === 'score_tcc_ai'" type="primary" icon="el-icon-sort" @click="changeImgTabel">切换</el-button>
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
import BaseTable from '@/components/BaseTable'
import mixins from './mixins'
import defaultSetting from '@/settings'
import { getScore, getNewScore } from '@/api'

const simple = [
  {
    label: '时间',
    prop: 'date',
    width: 120
  },
  {
    label: 'PS评分',
    prop: 'Ps'
  },
  {
    label: 'PC评分',
    prop: 'Pc'
  },
  {
    label: 'ACC评分',
    prop: 'ACC'
  },
  {
    label: 'RMSE',
    prop: 'RMSE'
  }
]

const proability = [
  {
    label: '时间',
    prop: 'date'
  },
  {
    label: 'AUC',
    prop: 'auc'
  }
]

const tcc = [
  {
    label: '站点编号',
    prop: 'code'
  },
  {
    label: 'TCC评分',
    prop: 'TCC'
  }
]

export default {
  name: 'Score',
  components: {
    BaseTable
  },
  mixins: [mixins],
  data() {
    return {
      list: [],
      images: [],
      query: {
        year: '2020',
        data_source: 'ECMWF',
        forecast_type: 'site_anomaly',
        climate_type: 'precipitation',
        time_step: 1,
        scale_abb: ['month', 'Apr']
      },
      defaultSetting
    }
  },
  computed: {
    columns() {
      const columns = {
        simple_score: simple,
        score_ai: simple,
        weighted_score: simple,
        proability_score: proability,
        simple_score_tcc: tcc,
        score_tcc_ai: tcc,
        weighted_score_tcc: tcc
      }
      return columns[this.type]
    }
  },
  created() {
    this.query.year = ''
    this.query.start_date = ''
    this.query.forecast_type = ''
    if (this.type === 'score_tcc_ai') {
      this.showImg = true
      this.query.data_source = 'NCEP'
    } else {
      this.showImg = false
    }
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const params = this.getParams()
      if (['score_ai', 'score_tcc_ai'].includes(this.type)) {
        getNewScore(this.type, params)
          .then(response => {
            if (response.state === 1) {
              this.list = this.formatData(response.data)
              this.images = this.type === 'score_tcc_ai' ? response.images : []
            } else {
              this.$message.error(response.message)
            }
            this.listLoading = false
          })
          .catch(() => {
            this.listLoading = false
          })
      } else {
        getScore(this.type, params)
          .then(response => {
            if (response.state === 1) {
              this.list = this.formatData(response.data)
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
      const { cols, index, vals } = data
      if (['simple_score_tcc', 'weighted_score_tcc', 'score_tcc_ai'].includes(this.type)) {
        cols.forEach((item, idx) => {
          const o = {}
          o.code = item
          o['TCC'] = vals[0][idx]
          ary.push(o)
        })
      } else {
        vals.forEach((item, idx) => {
          const o = {}
          item.forEach((v, i) => {
            o[cols[i]] = v
          })
          o.date = index[idx]
          ary.push(o)
        })
      }

      return ary
    }
  }
}
</script>

<style lang="scss">
.el-icon-sort {
  transform: rotate(90deg);
}
.el-col-24 {
  height: 51px !important;
}
</style>
