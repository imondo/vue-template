<template>
  <div class="about">
    <h1>{{ $route.meta.title }}</h1>
    <router-link :to="{ name: 'ProjectDetail' }">详情</router-link>
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="Title" prop="title"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getList } from '@/api/list';
export default {
  name: 'Page',
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
        this.list = res.items;
      });
    }
  }
};
</script>
