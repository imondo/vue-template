import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  outDir: 'dist',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
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
    },
  },
  server: {
    port: 5000,
    proxy: {
      '/api': 'http://test.com'
      // '/api': {
      //   target: 'http://test.com',
      //   changeOrigin: true,
      //   // rewrite: path => path.replace(/^\/api/, '')
      // }
    }
  }
});
