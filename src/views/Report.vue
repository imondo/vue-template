<template>
  <div class="about">
    <h1>{{ $route.meta.title }}</h1>
    <el-table
      :data="list"
      height="600px"
      tooltip-effect="dark"
      highlight-current-row
      border
      stripe
      style="width: 100%"
    >
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="品目名称" prop="categoryName" show-overflow-tooltip></el-table-column>
      <el-table-column label="物品名称" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="物品编号" prop="code" show-overflow-tooltip></el-table-column>
      <el-table-column label="规格型号" prop="spec" show-overflow-tooltip></el-table-column>
      <el-table-column label="单位" prop="uom" show-overflow-tooltip></el-table-column>
      <el-table-column label="参考单价" prop="price" show-overflow-tooltip></el-table-column>
      <el-table-column label="详情">
        <template slot-scope="{row}">
          <router-link :to="{ name: 'ProjectDetail', query: { id: row.id } }" class="el-button el-button--text el-button--small">详情</router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getList } from '@/api/list';
export default {
  name: 'Report',
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getListDemo();
  },
  methods: {
    getListDemo() {
      getList().then(res => {
        this.list = res.items.splice(0, 100);
      });
    }
  }
};
</script>
