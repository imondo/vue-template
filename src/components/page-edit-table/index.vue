<template>
  <div class="edit-table">
    <slot></slot>
  </div>
</template>

<script>
import TableStore from './table-store';
export default {
  name: 'PageEditTable',
  provide() {
    return {
      editTable: this
    };
  },
  model: {
    prop: 'tableData',
    event: 'table-data-change'
  },
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 需要验证的列字段
    columns: {
      type: Array,
      default: () => []
    },
    // 是否可编辑
    defaultEdit: {
      type: Boolean,
      default: true
    },
    // 验证集合
    verifyRules: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      store: null
    };
  },
  watch: {
    tableData: {
      immediate: true,
      handler(newVal, oldVal) {
        this.initTable();
      }
    }
  },
  methods: {
    initTable() {
      // 初始化数据
      this.store = new TableStore({
        list: this.tableData,
        columns: this.columns,
        defaultEdit: this.defaultEdit
      });
    },
    // 验证表格数据
    async verifyTable() {
      const verifyList = [];
      const { list, columns } = this.store;
      const len = list.length;
      for (let i = 0; i < len; i++) {
        const row = list[i];
        columns.forEach(prop => {
          const cellState = this.store.GetTableCell(row, prop);
          if (cellState.edit && this.verifyRules[prop]) {
            // 定义行数据验证
            const verifyCell = new Promise((resolve, reject) => {
              this.verifyTableCell(row, prop, cellState).then(errMsg => {
                if (errMsg) {
                  reject(false);
                } else {
                  resolve(true);
                }
              });
            });

            // 验证集合
            verifyList.push(verifyCell);
          }
        });
      }
      // 统一验证
      try {
        await Promise.all(verifyList);
        return true;
      } catch (error) {
        return false;
      }
    },
    // 验证当前行数据
    verifyTableCell(row, prop, cellState) {
      const verify = this.verifyRules[prop]; // 验证规则
      return new Promise((resolve, reject) => {
        verify(row, errMsg => {
          Object.assign(cellState, { errMsg });
          resolve(errMsg);
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
