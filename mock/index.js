import Mock from 'mockjs';
import list from './modules/list';

// mock数据集合
const mocks = [...list];

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
