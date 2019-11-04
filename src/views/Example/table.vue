<template>
  <div>
    <md-table :data="tableData" height="500px">
      <md-table-column label="列1" prop="code" width="100" fixed></md-table-column>
      <md-table-column label="列2" prop="categoryName" fixed="right"></md-table-column>
      <md-table-column label="列3" prop="spec"></md-table-column>
      <md-table-column label="列4" prop="spec"></md-table-column>
      <md-table-column label="列5" prop="spec"></md-table-column>
      <md-table-column label="列6" prop="spec"></md-table-column>
    </md-table>
  </div>
</template>

<script>
import { getList } from '@/api/list';
export default {
  name: 'TableComp',
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getListDemo();
  },
  methods: {
    getListDemo() {
      getList().then(res => {
        this.tableData = res.items;
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
