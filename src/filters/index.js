export function translateStatusName(statusNum) {
  let statusName = '';
  switch (statusNum) {
    case '2':
      statusName = '待审核';
      break;
    case '3':
      statusName = '已打回';
      break;
    case '4':
      statusName = '已验收';
      break;
    case '5':
      statusName = '待审核';
      break;
    case '6':
      statusName = '打回';
      break;
    case '7':
      statusName = '审核通过';
      break;
    case '8':
      statusName = '审核通过';
      break;
  }
  return statusName;
}

// 按百分比显示数 不带百分号
export function percentNumber(num) {
  if (Number(num)) return (num * 100).toFixed(2);
  return 0;
}

// 按百分比显示数 带百分号
export function percentNumberWithCode(num) {
  if (Number(num)) return (num * 100).toFixed(2) + '%';
  return 0;
}

export function timeFilter(val) {
  return val.substring(0, 10);
}

export function keepTwoDecimal(val, num = 2) {
  if (val) {
    return Number(val).toFixed(num);
  }
  return val;
}
