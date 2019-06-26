import Vue from 'vue';

class TableStore {
  constructor(options) {
    Object.assign(
      this,
      {
        defaultEdit: false, // 是否编辑
        list: [], // 表格数据集合
        columns: [] // 验证字段集合
      },
      options
    );

    this.states = new Map();

    this.SetTableStates(this.list, this.columns);
  }
  // 表格设置编辑状态
  SetTableStates(data, columns) {
    for (let i = 0, len = data.length; i < len; i++) {
      const row = data[i];
      const cellStates = this.SetTableCellStates(columns);
      this.states.set(row, cellStates);
    }
  }

  // 当前列初始化编辑状态
  SetTableCellStates(columns) {
    const cellStates = new Map();
    columns.forEach(prop => {
      const states = Object.assign(
        {},
        {
          edit: this.defaultEdit,
          hovering: false,
          errMsg: ''
        }
      );
      // 监测响应
      cellStates.set(prop, Vue.observable(states));
    });
    return cellStates;
  }

  // 获取行数据
  GetTableRow(row) {
    return this.states.get(row);
  }

  // 获取当前列状态
  GetTableCell(row, prop) {
    const rowState = this.GetTableRow(row);
    return rowState.get(prop);
  }
}

export default TableStore;
