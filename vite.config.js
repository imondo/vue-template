const path = require('path');
const { default: PurgeIcons } = require('vite-plugin-purge-icons');

module.exports = {
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: '/vue',
  /**
   * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
  outDir: 'dist',
  port: 3000,
  // 是否自动在浏览器打开
  open: true,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  // 引入第三方的配置
  optimizeDeps: {
    include: ['moment', 'echarts', 'axios', 'mockjs']
  },
  alias: {
    // 必须以斜线开始和结束
    '/@/': path.resolve(__dirname, './src')
    // '/@components/': path.resolve(__dirname, './src/components')
  },
  cssPreprocessOptions: {
    // less 全局配置
    less: {
      modifyVars: {
        hack: `true; @import "${path.resolve(
          __dirname,
          './src/styles/variable.less'
        )}";`
      }
    }
  },
  plugins: [PurgeIcons()],
  proxy: {
    // '/api': 'http://test.com'
    // '/api': {
    //   target: 'http://test.com',
    //   changeOrigin: true,
    //   // rewrite: path => path.replace(/^\/api/, '')
    // }
  }
};
