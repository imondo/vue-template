<template>
  <div class="table-header el-table__header">
    <table>
      <colgroup>
        <template v-for="({ label, prop }, index) in columns">
          <col :key="index" :width="columnWidth" />
        </template>
      </colgroup>
      <thead>
        <tr>
          <template v-for="({ label, prop }, index) in columns">
            <th :key="index">{{ label }}</th>
          </template>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MdTableHeader',
  inject: ['table'],
  computed: {
    columns() {
      return this.table.columns;
    },
    columnWidth() {
      return this.table.defaultColumnWidth;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
