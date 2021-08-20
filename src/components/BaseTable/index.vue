<template>
  <el-table :data="data" border v-bind="$attrs">
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
    }
  },
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
