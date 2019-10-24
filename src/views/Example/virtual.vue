<template>
  <div class="about">
    <VirtualBlock :list="list" :selection="multipleTable">
      <template slot-scope="{data}">
        <el-table
          :data="data"
          height="500px"
          tooltip-effect="dark"
          highlight-current-row
          border
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column align="center" label="序号" width="75">
            <template slot-scope="scope">{{ scope.row.$index }}</template>
          </el-table-column>
          <el-table-column label="品目名称" prop="categoryName" show-overflow-tooltip></el-table-column>
          <el-table-column label="物品名称" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="物品编号" prop="code" show-overflow-tooltip></el-table-column>
          <el-table-column label="规格型号" prop="spec" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" prop="uom" show-overflow-tooltip></el-table-column>
          <el-table-column label="参考单价" prop="price" show-overflow-tooltip></el-table-column>
          <el-table-column label="详情">
            <template slot-scope="{row}">
              <router-link
                :to="{ name: 'ProjectDetail', query: { id: row.id } }"
                class="el-button el-button--text el-button--small"
              >详情</router-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </VirtualBlock>
  </div>
</template>
<script>
import { getBigList } from '@/api/list';
export default {
  name: 'Virtual',
  data() {
    return {
      list: [],
      multipleTable: []
    };
  },
  created() {
    this.getListDemo();
  },
  methods: {
    getListDemo() {
      setTimeout(() => {
        getBigList().then(res => {
          this.list = res.items;
        });
      }, 2000);
    },
    handleSelectionChange(val) {
      this.multipleTable = val;
    }
  }
};
</script>
