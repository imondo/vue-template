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
    // 当前列是否可以编辑
    cellEdit: {
      type: Boolean,
      default: false
    },
    // 验证集合
    verifyRules: {
      type: Object,
      default: () => {
        return {};
      }
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
        defaultEdit: this.defaultEdit,
        cellEdit: this.cellEdit
      });
    },
    /**
     * 验证表格
     * @param { Boolean } isBreakOff // 存在验证错误时是否中断验证
     */
    async verifyTable(isBreakOff = false) {
      // 统一验证
      try {
        if (isBreakOff) {
          const breakOff = this.breakOffVerify();
          await Promise.all(breakOff);
          return true;
        } else {
          const verifyList = this.getAllColumnsVerify();
          await Promise.all(verifyList);
          return true;
        }
      } catch (error) {
        return false;
      }
    },
    // 中断验证
    breakOffVerify() {
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
              if (cellState.errMsg) {
                reject(false);
              } else {
                resolve(true);
              }
            });

            // 验证集合
            verifyList.push(verifyCell);
          }
        });
      }
      return verifyList;
    },
    // 验证prop
    verifyCell(row, prop) {
      if (typeof prop !== 'string' && !Array.isArray(prop)) {
        console.warn('prop is not String or Array');
        return;
      }
      if (typeof prop === 'string') {
        const cellState = this.store.GetTableCell(row, prop);
        this.verifyTableCell(row, prop, cellState);
      }
      if (Array.isArray(prop)) {
        prop.forEach(p => {
          const cellState = this.store.GetTableCell(row, p);
          this.verifyTableCell(row, p, cellState);
        });
      }
    },
    // 重置表格验证信息
    restTable() {
      if (!this.columns) {
        console.warn('请填写验证columns字段');
        return;
      }
      const states = this.store.states;
      states.forEach((value, row) => {
        this.columns.forEach(prop => {
          this.restTableCell(row, prop);
        });
      });
    },
    // 重置prop验证信息
    restTableCell(row, prop) {
      if (typeof prop !== 'string' && !Array.isArray(prop)) {
        console.warn('prop is not String or Array');
        return;
      }
      if (typeof prop === 'string') {
        const cellState = this.store.GetTableCell(row, prop);
        cellState.errMsg = '';
      }
      if (Array.isArray(prop)) {
        prop.forEach(p => {
          const cellState = this.store.GetTableCell(row, p);
          cellState.errMsg = '';
        });
      }
    },
    verifyTableCell(row, prop, cellState) {
      const verify = this.verifyRules[prop]; // 验证规则
      return new Promise((resolve, reject) => {
        // 验证规则不存在时为真
        if (!verify) {
          resolve();
        }
        verify(row, errMsg => {
          Object.assign(cellState, { errMsg });
          resolve(errMsg);
        });
      });
    },
    // 获取所有验证字段集合
    getAllColumnsVerify() {
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
      return verifyList;
    }
  }
};
</script>

<style lang="scss">
</style>
