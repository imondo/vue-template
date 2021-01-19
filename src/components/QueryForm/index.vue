<template>
  <el-card class="query-form-card">
    <el-form :inline="true" :model="form" class="query-form">
      <el-row :gutter="24">
        <slot></slot>
        <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onClick">查询</el-button>
            <slot name="btn"></slot>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'QueryForm',
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onClick() {
      this.$emit('query')
    }
  }
}
</script>

<style lang="scss">
.query-form-card {
  .el-card__body {
    padding-bottom: 0;
  }
}
</style>
