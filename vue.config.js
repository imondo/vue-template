'use strict';

const path = require('path');
// 打包进度查看
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
// webpack配置
const webpackConfig = require('./build/webpack.base.conf');

const local = require('./build/setting');

const host = local();
const port = 9528;

const isProduction = process.env.NODE_ENV === 'production'; // 生产环境

const isDevelopment = process.env.NODE_ENV === 'development'; // 开发环境

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: '/temp/', // 设置路由base
  outputDir: 'dist', // 打包输出目录
  assetsDir: 'static', // 打包文件目录
  lintOnSave: isDevelopment, // eslint-loader 是否在保存的时候检查
  productionSourceMap: false,
  devServer: {
    open: true,
    host,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api/mock': {
        target: `http://${host}:${port}`,
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    },
    after: require('./mock/server.js') // 使用mock数据模拟
  },
  configureWebpack: () => {
    if (isProduction) {
      return smp.wrap(webpackConfig);
    }    
  },
  chainWebpack(config) {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    // config.entry('app').add('babel-polyfill');
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api')); // 设置别名
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    config.module
      .rule('txt')
      .test(/\.txt$/)
      .use('file-loader')
      .loader('file-loader?name=releaseNotes/[name].[ext]')
      .end();

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config.module.rule();

    config.when(isDevelopment, config => config.devtool('cheap-source-map'));

    config.when(isProduction, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk('single');
    });
  }
};
