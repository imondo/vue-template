import dayjs from 'dayjs';

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function hasKey(obj, key) {
  return Reflect.has(obj, key);
}

export function getNowTime(format = 'YYYY-MM-DD') {
  return dayjs().format(format);
}

export function formatTime(time, format = 'YYYY-MM-DD') {
  return dayjs(time).format(format);
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function extend(target, obj) {
  return Object.assign({}, target, target);
}
