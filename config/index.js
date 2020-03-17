const local = require('./../build/setting');

const host = local();

/**
 * 项目启动配置
 * publicPath 项目根路径
 * host 本机host
 * port 本机端口
 * proxy webpack代理
 */
const config = {
  publicPath: '/vue-template/',
  host: host || 'http://localhost',
  prot: 8080,
  proxyTarget: 'https://test.com'
}

module.exports = {
  publicPath: config.publicPath,
  host: config.host,
  port: config.prot,
  proxy: {
    '/api/mock': {
      target: `http://${config.host}:${config.prot}`,
      changeOrigin: true,
      pathRewrite: {'^/api': ''}
    },
    '/test/api/': {
      target: config.proxyTarget,
      changeOrigin: true
    },
    [process.env.VUE_APP_BASE_API]: {
      target: `http://localhost:${config.port}${config.publicPath}`,
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.VUE_APP_BASE_API]: ''
      }
    }
  }
}