import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import styleImport from 'vite-plugin-style-import';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default ({ command }) => {
  // 根据项目配置。可以配置在.env文件
  let prodMock = true;
  return defineConfig({
    base: '/',
    outDir: 'dist',
    plugins: [
      vue(),
      vueJsx(),
      styleImport({
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: name => {
              return `element-plus/lib/theme-chalk/${name}.css`;
            },
            resolveComponent: name => {
              return `element-plus/lib/${name}`;
            }
          }
        ]
      }),
      viteMockServe({
        supportTs: false,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        // less 全局配置
        less: {
          modifyVars: {
            hack: `true; @import "${path.resolve(
              __dirname,
              './src/styles/variable.less'
            )}";`
          }
        }
      }
    },
    server: {
      port: 5000,
      proxy: {
        // '/api': 'http://test.com'
        // '/mock': {
        //   target: 'http://test.com',
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/mock/, '')
        // }
      }
    }
  });
};
