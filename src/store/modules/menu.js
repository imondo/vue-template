import { getMenu } from '@/api/user';
import { deepClone } from '@/utils/util';
import { generateRoute } from '@/hooks/useMenu';

function genMenuData(list) {
  const genTree = id => {
    const arr = [];
    list
      .filter(item => {
        return item.pid === id;
      })
      .forEach(item => {
        arr.push({
          ...item,
          children: genTree(item.id)
        });
      });
    return arr;
  };
  return genTree(0);
}

const state = () => ({
  menuList: [],
  mapMenuList: []
});

const mutations = {
  SET_MENU_LIST(state, list) {
    const _list = deepClone(list);
    const menuList = genMenuData(_list);
    state.menuList = menuList;
    state.mapMenuList = _list;
  }
};

const actions = {
  async GetMenuList({ commit }) {
    return getMenu().then(async menu => {
      commit('SET_MENU_LIST', menu);
      await generateRoute(menu);
      return;
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
