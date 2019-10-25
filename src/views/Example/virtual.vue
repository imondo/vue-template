<template>
  <div class="about">
    <el-button type="primary" class="mb-10" @click="handleSelection">已选中</el-button>
    <VirtualBlock ref="virtual" :list="list" :selection="multipleTable" @selection-change="handleSelect">
      <template slot-scope="{data, select, selectAll}">
        <el-table
          ref="table"
          :data="data"
          height="500px"
          tooltip-effect="dark"
          highlight-current-row
          border
          stripe
          style="width: 100%"
          @select="select"
          @select-all="selectAll"
        >
          <el-table-column type="selection" width="50" align="center" fixed></el-table-column>
          <el-table-column align="center" label="序号" width="75" fixed>
            <template slot-scope="scope">{{ scope.row.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="品目名称" prop="categoryName" width="175" show-overflow-tooltip fixed></el-table-column>
          <el-table-column label="物品名称" prop="name" width="275" show-overflow-tooltip fixed></el-table-column>
          <el-table-column label="物品编号" prop="code" show-overflow-tooltip></el-table-column>
          <el-table-column label="规格型号" prop="spec" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" prop="uom" show-overflow-tooltip></el-table-column>
          <el-table-column label="参考单价" prop="price" show-overflow-tooltip></el-table-column>
          <el-table-column label="详情">
            <template slot-scope="{row}">
              <el-button type="primary" icon="el-icon-edit" round @click="handleClick(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </VirtualBlock>
    <el-card class="box-card">
      <div>详情：{{ edit }}</div>
    </el-card>
  </div>
</template>
<script>
import { getBigList } from '@/api/list';
export default {
  name: 'Virtual',
  data() {
    return {
      list: [],
      multipleTable: [],
      edit: {}
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
      }, 1000);
    },
    handleClick(row) {
      this.edit = { ...row };
    },
    handleSelect(val) {
      this.multipleTable = val;
    },
    handleSelection() {
      console.log(this.multipleTable);
    }
  }
};
</script>
