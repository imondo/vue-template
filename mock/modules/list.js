import Mock from 'mockjs';

const data = Mock.mock({
  'items|100': [{
    id: '@id',
    categoryName: '@cword(2, 10)',
    code: '@integer(30000, 50000)',
    // name: '@cword(2, 20)',
    name: '',
    spec: '@cword(10, 50)',
    'uom|1': ['台', '只', '个', '条', '瓶'],
    price: '@float(1, 100, 0, 2)',
    purchaseDate: '', // '@date(yyyy-MM-dd)',
    'status|1': ['published', 'draft', 'deleted']
  }]
});

const bigData = Mock.mock({
  'items|1000': [{
    id: '@id',
    categoryName: '@cword(2, 10)',
    code: '@integer(30000, 50000)',
    name: '@cword(2, 20)',
    spec: '@cword(10, 50)',
    'uom|1': ['台', '只', '个', '条', '瓶'],
    price: '@float(1, 100, 0, 2)',
    purchaseDate: '', // '@date(yyyy-MM-dd)',
    'status|1': ['published', 'draft', 'deleted']
  }]
});

export default [
  {
    url: '/mock/list',
    type: 'get',
    response: data
  },
  {
    url: '/mock/big/list',
    type: 'get',
    response: bigData
  }
];
