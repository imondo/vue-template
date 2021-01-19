import { getMenus } from '@/api/user'
import local from './local'

export const MENU_GET = 'MENU_GET'
export const MENU_SET = 'MENU_SET'
export const MENU_CLEAR = 'MENU_CLEAR'
export const MENU_LOCAL_NAME = 'ZNQX-menu'

// 菜单平铺
function menuFlat(menu) {
  let _menu = []
  menu.map(item => {
    _menu.push(item)
    if (item.child[0]) {
      _menu = _menu.concat(menuFlat(item.child))
    }
    return true
  })
  return _menu
}

// 获取缓存菜单
function menuLocal() {
  const menu = local.getItem(MENU_LOCAL_NAME)
  if (menu && menu[0]) {
    return {
      menu,
      menuFlat: menuFlat(menu)
    }
  }
  return {
    menu: [],
    menuFlat: []
  }
}

/* eslint-disable no-param-reassign */
export default {
  namespaced: true,
  state: menuLocal(),
  mutations: {
    [MENU_SET](state, menu) {
      Object.assign(state, {
        menu,
        menuFlat: menuFlat(menu)
      })
      local.setItem(MENU_LOCAL_NAME, menu)
    },
    [MENU_CLEAR](state) {
      state = {
        menu: [],
        menuFlat: []
      }
      local.removeItem(MENU_LOCAL_NAME, state)
    }
  },
  actions: {
    async [MENU_GET]({ state, dispatch }, name = '') {
      try {
        if (!state.menu[0]) {
          if (name !== 'login' && !this._vm.onLoading) {
            this._vm.onLoading = this._vm.$loading({
              text: '加载中...',
              background: 'rgba(255,255,255,.4)'
            })
          }
          await getMenus()
            .then(response => {
              dispatch(MENU_SET, response)
              if (this._vm.onLoading) {
                this._vm.onLoading.close()
              }
            })
        }
      } catch (error) {
        throw new Error(error)
      }
    }, // 获取菜单信息
    [MENU_SET]({ commit, dispatch, state }, menu) {
      commit(MENU_SET, menu)
      return dispatch('permission/generateRoutes', state.menuFlat, { root: true })
    }, // 设置菜单信息
    [MENU_CLEAR]({ commit }) {
      commit(MENU_CLEAR)
    } // 清空菜单信息
  }
}
