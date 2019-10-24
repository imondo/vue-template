import http from '@/utils/http.js';

export function getList() {
  return http.get('/mock/list');
}

export function getBigList() {
  return http.get('/mock/big/list');
}

export function getTree() {
  return http.get('/mock/tree');
}
