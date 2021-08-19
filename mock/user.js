import { mock, Random } from 'mockjs';
import { getUuid, genResponse } from './utils';

const users = [
  {
    id: 0,
    username: 'test',
    password: '123456'
  },
  {
    id: 1,
    username: 'admin',
    password: '123456'
  }
];

const user = mock({
  'id|1-10': 1,
  username: Random.first(),
  name: Random.cname(),
  email: Random.email(),
  loginDate: Random.date()
});

export function login({ body }) {
  console.log('body ===>', body);
  const user = users.find(user => body.username === user.username);
  if (user && user.password === body.password) {
    const data = {
      token: getUuid()
    };
    return genResponse(200, data, '登录成功');
  }
  return genResponse(400, null, '用户名或密码错误');
}

export function getUserInfo() {
  return genResponse(200, user, '操作成功');
}
