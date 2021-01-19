<template>
  <div class="app-container">
    <el-card class="app-content chart-container">
      <chart height="600px" width="1200px" />
    </el-card>
  </div>
</template>

<script>
import Chart from '@/components/Charts/Heatmap'
export default {
  components: {
    Chart
  }
}
</script>
