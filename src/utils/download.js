import { exportFile } from './http';
import { Message } from 'element-ui';
/**
 * blob下载
 * @param {String} url 请求地址
 * @param {String} method 请求方式 默认`get`
 * @param {Object} data 请求数据
 * @param {Function} callback 请求结束回调
 */
export function handleExport({
  url,
  data = {},
  method = 'get',
  callback = () => {}
}) {
  exportFile({ url, data, method })
    .then(res => {
      const { msg } = res;
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target.result.includes('"data":""')) {
          const result = JSON.parse(e.target.result);
          Message({
            message: result.msg,
            type: 'warning'
          });
        }
      };
      reader.readAsText(res.data);
      callback();
      if (!msg) {
        const headers = res.headers['content-disposition']
          ? res.headers['content-disposition'].split('=')
          : '';
        const fileName = headers ? headers[1] : '文件';
        const blob = window.URL.createObjectURL(res.data);
        reader.onload = function(e) {
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = blob;
          link.setAttribute('download', decodeURI(fileName));
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blob);
        };
      }
    })
    .catch(err => {
      Message({
        message: '导出错误',
        type: 'warning'
      });
      callback(err);
    });
}
