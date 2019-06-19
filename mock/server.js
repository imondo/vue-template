const chokidar = require('chokidar'); // 监控文件
const path = require('path');

const mockDir = path.join(process.cwd(), 'mock'); // mock文件夹

function registerMockApi(app) {
  let mockLastIndex;
  const { default: mocks } = require('./index');
  for (const mock of mocks) {
    app[mock.type](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocks).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

module.exports = app => {
  require('@babel/register')({
    presets: ['@babel/preset-env']
  }); // 解决es6 node环境

  const mockRoutes = registerMockApi(app);
  var mockRoutesLength = mockRoutes.mockRoutesLength;
  var mockStartIndex = mockRoutes.mockStartIndex;

  // 监控node文件
  chokidar
    .watch(mockDir, {
      ignored: /server/,
      ignoreInitial: true
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          unregisterRoutes();

          const mockRoutes = registerMockApi(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;

          console.log('update mock');
        } catch (error) {
          console.log(error);
        }
      }
    });
};
