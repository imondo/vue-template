import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dist/',
  outDir: 'dist',
  plugins: [
    vue(),
    vueJsx(),
    vitePluginImp({
      libList: [
        {
          libName: 'ant-design-vue',
          style(name) {
            return `ant-design-vue/es/${name}/style/index.css`;
          }
        }
      ]
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
      '/api': 'http://test.com',
      '/mock': {
        target: 'http://test.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/mock/, '')
      }
    }
  }
});
