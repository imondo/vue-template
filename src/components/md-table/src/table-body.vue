<template>
  <div class="table-body el-table__body">
    <table>
      <colgroup>
        <template v-for="({ label, prop }, index) in columns">
          <col :key="index" :width="columnWidth" />
        </template>
      </colgroup>
      <tbody>
        <template v-for="(row, index) in tableData">
          <tr :key="index">
            <template v-for="({ prop }, index) in columns">
              <td :key="index">{{ row[prop] }}</td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MdTableBody',
  inject: ['table'],
  computed: {
    tableData() {
      return this.table.data;
    },
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
