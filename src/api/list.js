import http from '@/utils/http.js';

export function getList() {
  return http.get('/mock/list');
}
