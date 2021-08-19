import { reactive } from 'vue';

export function useList(get) {
  // 列表数据
  const state = reactive({
    loading: true, // 加载状态
    list: [] // 列表数据
  });

  // 获取列表
  function getList() {
    state.loading = true;
    return get({
      url: '/getUsers',
      method: 'get'
    })
      .then(({ data, total }) => {
        // 设置列表数据
        state.list = data;
      })
      .finally(() => {
        state.loading = false;
      });
  }

  // 首次获取数据
  getList();

  return { state, getList };
}
