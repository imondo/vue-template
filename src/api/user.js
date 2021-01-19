import request from '@/utils/request'

export function login(data) {
  return request.post('/login', data)
}

export function getInfo(data) {
  return request.get('/vue-admin-template/user/info', data)
}

export function logout() {
  return request.post('/logout')
}

export function getUser(data) {
  return request.get('/common/users', data)
}

export function getUserCurrent(data) {
  return request.get('/common/users/current', data)
}

export function getMenus(data = {}) {
  return request.get('/common/permissions/current', data)
}

export function getMenusOwns(data = {}) {
  return request.get('/common/permissions/owns', data)
}

export function getRoles(data = {}) {
  return request.get('/common/roles', data)
}
