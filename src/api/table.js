import { get } from '@/utils/request';

export function getList(data) {
  return get({
    url: '/mock/list',
    data
  });
}
