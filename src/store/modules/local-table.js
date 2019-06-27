// 本地操作表格数据

const localTable = {
  states: {
    list: [] // 本地表格数据
  },
  mutations: {
    SET_TABLE_LIST: (state, list) => {
      state.list = [...list];
    }
  }
};

export default localTable;
