import Mock from 'mockjs';
import list from './modules/list';
import user from './modules/user';
import tree from './modules/tree';

// mock数据集合
const mocks = [...list, ...user, ...tree];

const responeMock = (url, type = 'get', response) => {
  return {
    url,
    type,
    response(req, res) {
      res.json(Mock.mock(response));
    }
  };
};

export default mocks.map(m => {
  return responeMock(m.url, m.type, m.response);
});
