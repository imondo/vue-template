<template>
  <el-pagination
    :current-page="defaultPag.pageNo"
    :page-sizes="defaultPag.pageSizes"
    :page-size="defaultPag.pageSize"
    :total="defaultPag.total"
    layout="total, sizes, prev, pager, next, jumper"
    class="page-pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script>
export default {
  name: 'PagePagination',
  props: {
    pageConfig: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    defaultPag: {
      get(val) {
        const config = Object.assign(
          {
            pageSizes: [15, 50, 100, 200],
            pageSize: 15,
            total: 0,
            pageNo: 1
          },
          this.pageConfig
        );
        return config;
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      const { pageNo } = this.defaultPag;
      this.$emit('change', { pageSize: val, pageNo });
    },
    handleCurrentChange(val) {
      const { pageSize } = this.defaultPag;
      this.$emit('change', { pageSize, pageNo: val });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-pagination {
  padding-top: 10px;
}
</style>

