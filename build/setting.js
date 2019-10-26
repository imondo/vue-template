/**
 * 获取本机IP
 */
if (process.env.NODE_ENV === 'production') {
  module.exports = function() {};
  return;
}
const os = require('os');

module.exports = function() {
  const nifs = os.networkInterfaces({ all: true }) || []; // 获取网卡信息
  const nifsAdress = ['以太网', '本地连接', 'en0'];
  const key = nifsAdress.find(v => Object.keys(nifs).includes(v));
  const nifsC = nifs[key];
  const localInfo = nifsC.find(v => v.family === 'IPv4');
  const localIp = localInfo.address || 'localhost';
  return localIp;
};