import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

/**
 * 获取 Table 方法
 * @param {Function} way 获取数据方法
 * @param {Object} data 查询参数
 * @returns
 */
export function useTableList({ query, data }) {
  const func = query;
  const queryData = data;

  const pageTable = ref(null);

  // 列表数据
  const state = reactive({
    loading: true, // 加载状态
    list: [] // 列表数据
  });

  // 获取列表
  function getTableList() {
    state.loading = true;
    console.log('queryData ===> ', queryData);
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
  getTableList();

  return { state, pageTable, getTableList };
}

/**
 * loading 数据
 * @param {Object} options { [type]: false }
 * @returns Object { loading }
 */
export function useLoading(options) {
  const store = useStore();
  store.dispatch('loading/SetLoading', options);
  return { loading: store.state.loading };
}
