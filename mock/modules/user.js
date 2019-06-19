import Mock from 'mockjs';

const Info = Mock.mock({
  data: {
    name: '测试湖北省管理员',
    orgId: '777777',
    orgName: '测试湖北省',
    orgType: '221'
  }
});

export default [
  {
    url: '/mock/user',
    type: 'get',
    response: Info
  }
];
