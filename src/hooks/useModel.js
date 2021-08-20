import { reactive } from 'vue';

/**
 * 获取 Table 方法
 * @param {Function} way 获取数据方法
 * @param {Object} data 查询参数
 * @returns
 */
export function useTableList({ query, data }) {
  const func = query;
  const queryData = data;
  // 列表数据
  const state = reactive({
    loading: true, // 加载状态
    list: [] // 列表数据
  });

  // 获取列表
  function getList() {
    state.loading = true;
    return func(queryData)
      .then(res => {
        // 设置列表数据
        state.list = res;
      })
      .finally(() => {
        state.loading = false;
      });
  }

  // 首次获取数据
  getList();

  return { state, getList };
}
