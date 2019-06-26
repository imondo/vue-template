import Vue from 'vue';
import Router from 'vue-router';
import routesConfig from './modules/routes';

Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL, // get vue.config.js publicPath
  routes: routesConfig,
  scrollBehavior: () => ({ y: 0 })
});
