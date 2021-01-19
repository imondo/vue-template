<template>
  <div class="app-container">
    <query-form :form="query" @query="onQuery">
      <query-form-item label="测试：">
        <el-input v-model="query.user" placeholder="测试" />
      </query-form-item>
      <query-form-item label="活动区域：">
        <el-select v-model="query.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </query-form-item>
    </query-form>
    <el-card class="app-content chart-container">
      <chart height="600px" width="1200px" />
    </el-card>
  </div>
</template>

<script>
import Chart from '@/components/Charts/Boxplot'
export default {
  components: {
    Chart
  },
  props: {
    type: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      query: {}
    }
  },
  mounted() {
    console.log(this.type)
  },
  methods: {
    onQuery() {
      console.log('查询')
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 240px);
}
</style>
