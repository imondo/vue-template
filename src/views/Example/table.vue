<template>
  <div>
    <md-table :data="tableData">
      <md-table-column label="列1" prop="code"></md-table-column>
      <md-table-column label="列2" prop="categoryName"></md-table-column>
      <md-table-column label="列3" prop="spec"></md-table-column>
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
        this.tableData = res.items.splice(1, 10);
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
