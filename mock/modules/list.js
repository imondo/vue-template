import Mock from 'mockjs';

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
});

export default [
  {
    url: '/mock/list',
    type: 'get',
    response: data
  }
];
