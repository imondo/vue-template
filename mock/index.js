import Mock from 'mockjs';
import { login, getUserInfo } from './user';
import { getMenus } from './menus';

export default [
  {
    url: '/mock/login',
    method: 'post',
    response: login
  },
  {
    url: '/mock/user',
    method: 'get',
    response: getUserInfo
  },
  {
    url: '/mock/menus',
    method: 'get',
    response: getMenus
  }
];
