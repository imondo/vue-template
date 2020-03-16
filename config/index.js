const local = require('./../build/setting');

const host = local();

const port = 8080;
/**
 * 项目启动配置
 * publicPath 项目根路径
 * host 本机host
 * port 本机端口
 * proxy webpack代理
 */
const proxyTarget = 'https://test.com';

module.exports = {
  publicPath: '/vue-template/',
  host: host || 'http://localhost',
  port,
  proxy: {
    '/api/mock': {
      target: `http://${host}:${port}`,
      changeOrigin: true,
      pathRewrite: {'^/api': ''}
    },
    '/test/api/': {
      target: proxyTarget,
      changeOrigin: true
    }
  }
}