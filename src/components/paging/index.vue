<template>
  <div class="pagination-wap">
    <el-pagination
      :layout="layout"
      :pager-count="pagerCount"
      :current-page="pageNo"
      :page-size="pageSize"
      :page-sizes="pageSizeList"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Paging',
  props: {
    pageNo: {
      type: Number,
      required: true
    }, // 当前页码
    pageSize: {
      type: Number,
      required: true
    }, // 每页条数
    pageSizeList: {
      type: Array,
      default: () => [10, 50, 100, 200]
    }, // 下拉框显示每页多少条数据选择，默认为[10, 50, 100, 200]
    total: {
      type: Number,
      required: true
    }, // 总条目数
    pagerCount: {
      type: Number,
      default: 5
    }, // 分页条按钮个数，默认为5个
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    } // 分页条功能
  },
  methods: {
    currentChange(pageNo) {
      this.$emit('update:pageNo', pageNo)
      this.$emit('change', pageNo, this.pageSize)
    }, // 页码发生变化触发，返回当前页码与每页条数
    sizeChange(pageSize) {
      this.$emit('update:pageSize', pageSize)
      this.$emit('change', 1, pageSize)
    } // 每页显示数据发生变化触发，返回当前页码与每页条数
  }
}
</script>

<style lang="scss" scoped>
.pagination-wap {
  margin-top: 5px;
  text-align: right;
}
</style>
