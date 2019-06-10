const path = require('path');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const OS = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length });

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.vue', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'happypack/loader?id=babel'
      },
      {
        test: /\.vue$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'happypack/loader?id=vue'
      }
    ]
  },
  plugins: [
    new SimpleProgressWebpackPlugin(),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threads: 4,
      threadPool: happyThreadPool,
      verbose: true
    }),
    new HappyPack({
      id: 'vue',
      threads: 4,
      loaders: ['vue-loader']
    })
  ]
};
