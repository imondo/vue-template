import Vue from 'vue'
import local from './local'
import { login, logout, getInfo, getUserCurrent, getMenusOwns } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { MENU_GET, MENU_CLEAR } from './menu'

export const USER_GET = 'USER_GET'
export const USER_SET = 'USER_SET'
export const USER_CLEAR = 'USER_CLEAR'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOCAL_NAME = 'ZNQX-user'

const getDefaultState = () => {
  return local.getItem(USER_LOCAL_NAME) || {
    id: '',
    name: '',
    username: '',
    loginCnt: '',
    loginTime: '',
    token: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    Vue.set(state, 'token', token)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  [USER_SET](state, user) {
    Object.assign(state, user)
    local.setItem(USER_LOCAL_NAME, state)
  },
  [USER_CLEAR](state) {
    state = {
      id: '',
      name: '',
      username: '',
      loginTime: '',
      token: ''
    }
    local.removeItem(USER_LOCAL_NAME, state)
  }
}

const actions = {
  // user login
  login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { token, user } = response
          commit('SET_TOKEN', token)
          setToken(token)
          dispatch(USER_SET, user).then(() => {
            dispatch(USER_GET, false).then(() => {
              resolve()
            })
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  async [USER_GET]({ state, dispatch }, loading = true) {
    if (state.id) {
      if (loading) {
        this._vm.onLoading = this._vm.$loading({
          text: '加载中...',
          background: 'rgba(255,255,255,.4)'
        })
      }
      await Promise.all([getUserCurrent(), getMenusOwns()]).then(async response => {
        await dispatch(`menu/${MENU_GET}`, {}, { root: true })
        await dispatch(
          USER_SET,
          Object.assign({ permissions: response[1] }, response[0])
        )
      })
    }
  }, // 获取用户信息

  async [USER_SET]({ commit, dispatch }, user) {
    if (user instanceof Object) {
      commit(USER_SET, user)
    } else {
      await dispatch(USER_GET)
    }
  }, // 设置用户信息

  [USER_CLEAR]({ commit }) {
    commit(USER_CLEAR)
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getUser
      getInfo(state.token)
        .then(response => {
          const { data } = response

          if (!data) {
            return reject('验证失败，请重新登录.')
          }

          const { name, avatar } = data

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          location.reload()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit, dispatch }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      dispatch('permission/RestRoutesState', {}, { root: true })
      dispatch(`menu/${MENU_CLEAR}`, {}, { root: true })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

