<template>
  <el-table
    v-loading="loading"
    :data="data"
    border
    v-bind="$attrs"
    element-loading-spinner="el-icon-loading"
    element-loading-text="加载中..."
  >
    <template v-for="{ prop, label, slot, ...attrs } in columns" :key="prop">
      <el-table-column :prop="prop" :label="label" v-bind="attrs">
        <template v-if="slot" #default="scope">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div class="pagination-wap">
    <el-pagination
      v-model:currentPage="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { ref } from 'vue';
export default {
  name: 'BaseTable',
  components: {
    [ElTable.name]: ElTable,
    [ElTableColumn.name]: ElTableColumn,
    [ElPagination.name]: ElPagination
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    loading: Boolean,
    total: {
      type: Number,
      default: 0
    }
  },
  emits: ['pageChange'],
  setup(props, { emit }) {
    const currentPage = ref(1);
    const pageSize = ref(10);
    return {
      currentPage,
      pageSize,
      handleSizeChange: val => {
        pageSize.value = val;
        emit('pageChange', {
          pageSizes: pageSize.value,
          page: currentPage.value
        });
      },
      handleCurrentChange: val => {
        currentPage.value = val;
        emit('pageChange', {
          pageSizes: pageSize.value,
          page: currentPage.value
        });
      }
    };
  }
};
</script>

<style lang="less" scoped>
.pagination-wap {
  padding-top: 10px;
  text-align: right;
  /deep/ .el-pagination {
    padding-right: 0;
    .btn-next {
      margin-right: 0;
      i {
        margin: 0 auto;
      }
    }
    .btn-prev {
      i {
        margin: 0 auto;
      }
    }
  }
}
</style>
