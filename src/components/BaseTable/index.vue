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
</template>

<script>
import { ElTable, ElTableColumn } from 'element-plus';
export default {
  name: 'BaseTable',
  components: {
    'el-table': ElTable,
    'el-table-column': ElTableColumn
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
    loading: Boolean
  },
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
