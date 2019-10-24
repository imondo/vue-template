<template>
  <div class="about">
    <el-button type="primary" class="mb-10" @click="handleClickEdit">点击列编辑表格</el-button>
    <el-button type="primary" class="mb-10" @click="handleClickDefult">默认编辑表格</el-button>
    <el-button type="primary" class="mb-10" @click="handleClick">保存</el-button>
    <el-button type="primary" class="mb-10" @click="handleRest">重置</el-button>
    <page-edit-table
      ref="editTable"
      v-model="tableData"
      :columns="['categoryName', 'name', 'purchaseDate']"
      :default-edit="defaultEdit"
      :cell-edit="cellEdit"
      :verify-rules="verifyRules"
    >
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        highlight-current-row
        border
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" width="50">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="{row}">
            <el-button type="text" @click="handleVaildate(row)">验证</el-button>
            <el-button type="text" @click="handleRestCell(row)">重置</el-button>
          </template>
        </el-table-column>
        <el-table-column label="品目名称" prop="categoryName" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <edit-table-cell :row="row" prop="categoryName">
              <template slot-scope="{ cellState, validateCell }">
                <el-select
                  v-if="cellState.edit"
                  v-model="row.categoryName"
                  clearable
                  placeholder="请选择品目"
                  @change="validateCell"
                >
                  <el-option label="你" value="1"></el-option>
                  <el-option label="好" value="2"></el-option>
                  <el-option label="呀" value="3"></el-option>
                </el-select>
                <span v-if="!cellState.edit">{{ row.categoryName }}</span>
              </template>
            </edit-table-cell>
          </template>
        </el-table-column>
        <el-table-column label="物品名称" prop="name" show-overflow-tooltip>
          <template slot-scope="{row}">
            <edit-table-cell
              :row="row"
              prop="name"
              slot-name="input"
              :maxlength="5"
              placeholder="请输入"
            >
              <template slot-scope="{ cellState, validateCell }">
                <el-input
                  v-if="cellState.edit"
                  v-model="row.name"
                  clearable
                  placeholder="请输入名称"
                  @input="validateCell"
                ></el-input>
                <span v-if="!cellState.edit">{{ row.name }}</span>
              </template>
            </edit-table-cell>
          </template>
        </el-table-column>
        <el-table-column label="物品编号" prop="code" show-overflow-tooltip></el-table-column>
        <el-table-column label="规格型号" prop="spec" show-overflow-tooltip></el-table-column>
        <el-table-column label="单位" prop="uom" show-overflow-tooltip></el-table-column>
        <el-table-column label="参考单价" prop="price" show-overflow-tooltip></el-table-column>
        <el-table-column label="购入日期" prop="purchaseDate" show-overflow-tooltip>
          <template slot-scope="{row}">
            <edit-table-cell :row="row" prop="purchaseDate">
              <template slot-scope="{cellState, validateCell}">
                <span v-if="!cellState.edit">{{ row.purchaseDate }}</span>
                <el-date-picker
                  v-if="cellState.edit"
                  v-model="row.purchaseDate"
                  type="date"
                  clearable
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  @change="validateCell"
                ></el-date-picker>
              </template>
            </edit-table-cell>
          </template>
        </el-table-column>
      </el-table>
    </page-edit-table>
    <page-pagination :page-config="pageConfig" @change="pageChange"></page-pagination>
  </div>
</template>
<script>
import { getList } from '@/api/list';

export default {
  name: 'EditTable',
  data() {
    return {
      loading: false,
      tableData: [],
      defaultEdit: true,
      cellEdit: false,
      pageConfig: {
        total: 100,
        pageSize: 15,
        pageNo: 1
      },
      verifyRules: {
        categoryName({ categoryName }, cb) {
          if (!categoryName) {
            cb('请选择品目');
          } else {
            cb('');
          }
        },
        name({ name }, cb) {
          if (!name) {
            cb('请选择品目');
          } else {
            cb('');
          }
        },
        purchaseDate({ purchaseDate }, cb) {
          if (!purchaseDate) {
            cb('请选择购入日期');
          } else {
            cb('');
          }
        }
      }
    };
  },
  created() {
    this.getListDemo();
  },
  methods: {
    getListDemo() {
      this.loading = true;
      getList().then(res => {
        const { pageNo, pageSize } = this.pageConfig;
        this.tableData = res.items.splice(pageNo, pageSize);
        this.loading = false;
      });
    },
    handleVaildate(row) {
      this.$refs.editTable.verifyCell(row, ['name', 'purchaseDate']);
    },
    handleClickEdit() {
      this.cellEdit = true;
      this.defaultEdit = false;
      this.getListDemo();
    },
    handleClickDefult() {
      this.cellEdit = false;
      this.defaultEdit = true;
      this.getListDemo();
    },
    handleClick() {
      this.$refs.editTable.verifyTable().then(valid => {
        if (valid) {
          this.$messages('success', '验证通过');
          console.log(this.list);
        } else {
          this.$messages('warning', '验证不通过');
        }
      });
    },
    handleRest() {
      this.$refs.editTable.restTable();
    },
    handleRestCell(row) {
      this.$refs.editTable.restTableCell(row, ['name', 'purchaseDate']);
    },
    pageChange(data) {
      this.pageConfig = Object.assign(this.pageConfig, data);
      this.getListDemo();
    }
  }
};
</script>
