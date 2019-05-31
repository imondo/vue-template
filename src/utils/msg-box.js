import { MessageBox, Message } from 'element-ui';

/**
 * 只有确认按钮的提示消息框
 * @param {string} content 提示消息内容
 * @param {string} title 提示标题默认值 提示
 * @param {Function} callback 确认回调
 */
export function msgAlert(
  content = '',
  title = '提示',
  callback = () => {},
  type = ''
) {
  MessageBox.alert(content, title, {
    confirmButtonText: '确定',
    type,
    callback: action => {
      callback(action);
    }
  });
}

export function messages(type = 'error', msg, callback = () => {}) {
  Message({
    type,
    message: msg,
    onClose: callback()
  });
}
