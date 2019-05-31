export function exportParam(obj) {
  let str = '';
  if (typeof obj !== 'object') {
    throw new Error('exportParam 过滤器参数要求类型为object');
  }
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      str += key + '=' + obj[key] + '&';
    }
  }
  return str.substr(0, str.length - 1);
}

export function toFixed(value, num) {
  const len = num || 2;
  const adjust = value >= 0 ? 0.5 : -0.5;
  const integer = String(value).includes('.');
  if (!integer) {
    return value.toFixed(len);
  }
  const numberFixed = (
    parseInt(value * Math.pow(10, len) + adjust) / Math.pow(10, len)
  ).toString();
  const dithering = numberFixed.split('.')[1];
  // 补0
  if (dithering.length < len) {
    return numberFixed + `0`;
  }
  return numberFixed;
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

export function getNowDate() {
  const showDate = new Date();
  const seperator = '-';
  const year = showDate.getFullYear();
  let month = showDate.getMonth() + 1;
  var strDate = showDate.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  const currentdate = year + seperator + month + seperator + strDate;
  return currentdate;
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

export function keepDecimal(val, decimal = 2) {
  if (!val || !Number(val)) return '';
  return Number(val).toFixed(decimal);
}

/**
 * 深赋值一个对象
 * @param {Object} obj
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 多条件排序
 * @param {String} name
 * @param {Function} minor
 */
export function multipleSortList(name, minor) {
  return function(o, p) {
    let a, b;
    if (o && p && typeof o === 'object' && typeof p === 'object') {
      a = o[name];
      b = p[name];
      if (a === b) {
        return typeof minor === 'function' ? minor(o, p) : 0;
      }
      if (typeof a === 'string' && typeof b === 'string') {
        if (!a && b) {
          return 1;
        }
        if (a && !b) {
          return -1;
        }
        toUTF8(a);
        toUTF8(b);
        // return a.localeCompare(b);
        return a < b ? -1 : 1;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    } else {
      throw new Error('排序错误');
    }
  };
}

/**
 * 中文字符串转成utf8
 * @param {String} str 需要转换的字符串
 */
function toUTF8(str) {
  const result = [];

  let k = 0;
  for (let i = 0; i < str.length; i++) {
    const j = encodeURI(str[i]);
    if (j.length === 1) {
      // 未转换的字符
      result[k++] = j.charCodeAt(0);
    } else {
      // 转换成%XX形式的字符
      const bytes = j.split('%');
      for (let l = 1; l < bytes.length; l++) {
        result[k++] = parseInt('0x' + bytes[l]);
      }
    }
  }
  console.log(result);
  return result;
}
