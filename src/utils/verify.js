/* eslint-disable no-useless-escape */
export const All = {
  reg: /^[0-9A-Za-z\u2E80-\uFE4F`~!@#$%^&*()\-_=+\[{\]}\\|;:'",<.>/?·！￥（）…－—【｛】｝、；：‘’“”，《。》？]+[0-9A-Za-z\u2E80-\uFE4F\s`~!@#$%^&*()\-_=+\[{\]}\\|;:'",<.>/?·！￥（）…－—【｛】｝、；：‘’“”，《。》？]*$/,
  text: '仅支持中英文数字及标点符号，首字符不能为空'
}

export const AllString = {
  reg: /^\S*[\s\S]*$/,
  text: '首字符不能为空'
}

export const Chinese = {
  reg: /^[a-zA-Z0-9\u2E80-\uFE4F]*$/,
  text: '仅支持中英文及数字，不能包含空格'
}

export const ChinesePoint = {
  reg: /^[a-zA-Z0-9\u2E80-\uFE4F`~!@#$%^&*()\-_=+\[{\]}\\|;:'",<.>/?]*$/,
  text: '仅支持中英文数字及英文标点符号，不能包含空格'
}

export const English = {
  reg: /^[0-9A-Za-z]*$/,
  text: '仅支持英文及数字，不能包含空格'
}

export const Mobile = {
  reg: /^1[345789]\d{9}$/,
  text: '格式不正确'
}

export const Email = {
  reg: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  text: '格式不正确'
}

export const Http = {
  reg: /^http[s]?:\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/,
  text: '格式不正确（http://或https://开始）'
}

export const Password = {
  reg: /^[0-9A-Za-z`~!@#$%^&*()\-_=+\[{\]}\\|;:'",<.>/?]*$/,
  text: '仅支持英文数字及标点符号，不能包含空格'
}

export const InfiniteNumber = {
  reg: /^(?:\d|[1-9]\d*)$/,
  text: '仅支持正整数'
}

export const ShortNumber = {
  reg: /^(?:0\.(?:[1-9]\d{0,3}|\d{0,3}[1-9])|([1-9]\d?)(\.\d{1,4})?)$/,
  text: '仅支持0.0001-99.9999'
}

export const ShortNumberZero = {
  reg: /^(?:0\.(?:[1-9]\d{0,3}|\d{0,3}[1-9])|([1-9]\d?)(\.\d{1,4})?|0)$/,
  text: '仅支持0或0.0001-99.9999'
}

export const LongNumber = {
  reg: /^(?:0\.(?:[1-9]\d?|\d[1-9])|([1-9]\d{0,11})(\.\d{0,2})?)$/,
  text: '仅支持整数部分12位和小数部分2位'
}

export const LongNumberZero = {
  reg: /^(?:0\.(?:[1-9]\d?|\d[1-9])|([1-9]\d{0,11})(\.\d{0,2})?|0)$/,
  text: '仅支持0或整数部分12位和小数部分2位'
}

export const regular = {
  All,
  AllString,
  Chinese,
  ChinesePoint,
  English,
  Mobile,
  Email,
  Http,
  Password,
  InfiniteNumber,
  ShortNumber,
  ShortNumberZero,
  LongNumber,
  LongNumberZero
}

export default ({
  required = true,
  text,
  type = 'English',
  minLength,
  enterType = '输入',
  setType = () => {},
  setText = () => {},
  setMessage = () => {},
  setValue = () => {},
  customCheck = () => {}
}) => async(rule, value, callback) => {
  const _text = (await setText()) || text
  const _message = (await setMessage()) || ''
  const _value = (await setValue()) || value
  const _type = (await setType()) || type
  if (['', null, undefined].includes(_value) && required) {
    return callback(new Error(_message || `请${enterType}${_text}`))
  }
  if (required && minLength && _value.length < minLength) {
    return callback(new Error(`${_text}不能少于${minLength}位`))
  }
  if (_value && !regular[_type].reg.test(_value)) {
    return callback(new Error(_text + regular[_type].text))
  }
  await customCheck(rule, _value, callback)
  return callback()
}
