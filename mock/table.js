import { mock, Random } from 'mockjs';
import { genResponse } from './utils';

const data = mock({
  'list|10': [
    {
      'id|+1': 1,
      name: {
        value: '@cname()'
      },
      age: '@natural(18, 50)',
      address: '@city()',
      date: '@date("yyyy-MM-dd")'
    }
  ]
});

export function getList() {
  return genResponse(200, data.list, '操作成功');
}
