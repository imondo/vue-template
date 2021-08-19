import { postJson, get, post } from '@/utils/request';

export function login(data) {
  return postJson({
    url: '/mock/login',
    data
  });
}

export function getUser() {
  return get({
    url: '/mock/user'
  });
}
export function getMenu() {
  return get({
    url: '/mock/menus'
  });
}
