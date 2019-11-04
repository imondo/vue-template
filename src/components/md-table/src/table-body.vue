<template>
  <table cellspacing="0" cellpadding="0" border="0" class="md-table__body">
    <colgroup>
      <template v-for="({ label, prop, minWidth, width }, index) in columns">
        <col :key="index" :name="index" :width="width" />
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
