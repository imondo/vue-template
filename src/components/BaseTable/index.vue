<template>
  <el-table :data="data" height="600px" border stripe v-bind="$attrs" v-on="$listeners">
    <el-table-column
      v-if="selection"
      type="selection"
      width="110"
      label-class-name="selection-cell"
    ></el-table-column>
    <template v-for="(column, index) in columns">
      <el-table-column :key="index" v-bind="column" align="center">
        <template v-slot="scope">
          <!-- solt 自定义列-->
          <template v-if="column.type === 'slot'">
            <slot :name="column.prop" :row="scope.row" />
          </template>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  name: 'BaseTable',
  props: {
    selection: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      defalut: () => []
    },
    columns: {
      type: Array,
      defalut: () => []
    }
  }
}
</script>
<style scoped></style>
