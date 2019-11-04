<template>
  <table cellspacing="0" cellpadding="0" border="0" class="md-table__header">
    <colgroup>
      <template v-for="({ label, prop, width, minWidth }, index) in columns">
        <col :key="index" :name="index" :width="width" />
      </template>
      <col v-if="hasGutter" name="gutter" width="17" />
    </colgroup>
    <thead>
      <tr>
        <template v-for="({ label, prop }, index) in columns">
          <th :key="index">{{ label }}</th>
        </template>
        <th v-if="hasGutter" class="gutter" style="width: 17px;" />
      </tr>
    </thead>
  </table>
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
    },
    hasGutter() {
      return this.table.hasGutter;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
