import http from '@/utils/http.js';

export function getUser() {
  return http.get('/mock/user');
}
