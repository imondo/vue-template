import Mock from 'mockjs';

const Info = Mock.mock({
  data: {
    name: 'Mondo',
    orgId: '777777',
    orgName: '超级管理员',
    orgType: '0'
  }
});

export default [
  {
    url: '/mock/user',
    type: 'get',
    response: Info
  }
];
