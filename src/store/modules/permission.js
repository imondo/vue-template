import { constantRoutes } from '@/router'
import asyncRoutes from '@/router/async-routes'
import local from './local'
import defaultSettings from '@/settings'

export const ROUTES_LOCAL_NAME = 'ZNQX-asyncRoutes'
/**
 * Use meta.role to determine if the current user has permission
 * @param menu
 * @param route
 */
function hasPermission(route, menus) {
  return menus.some(menu => {
    const isTrue = route.name === menu.href
    if (isTrue) {
      route.meta.title = menu.name
      route.meta.icon = menu.icon || 'el-icon-s-marketing'
      route.sort = route.sort || menu.id
    }
    return isTrue
  })
}

function sortMenu(data) {
  if (!data.length) return
  data.forEach(function(menu) {
    if (menu.children) {
      menu.children.sort(function(a, b) {
        return a.sort - b.sort
      })
      sortMenu(menu.children)
    } else {
      return
    }
  })
  data.sort(function(a, b) {
    return a.sort - b.sort
  })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menu
 */
export function filterAsyncRoutes(routes, menu) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp, menu)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menu)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: local.getItem(ROUTES_LOCAL_NAME) || [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    const _routes = constantRoutes.concat(routes)
    state.addRoutes = routes
    state.routes = _routes
    local.setItem(ROUTES_LOCAL_NAME, _routes)
  },
  RESET_STATE: state => {
    Object.assign(state, {
      routes: [],
      addRoutes: []
    })
  }
}

const actions = {
  generateRoutes({ commit }, menuFlat) {
    return new Promise(resolve => {
      if (defaultSettings.debugging) {
        commit('SET_ROUTES', asyncRoutes)
        resolve()
      } else {
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, menuFlat)
        sortMenu(accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        // router.addRoutes(accessedRoutes)
        resolve()
      }
    })
  },
  RestRoutesState({ commit }) {
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
