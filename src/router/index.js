import Vue from 'vue';
import Router from 'vue-router';
import routes from './modules/routes';

Vue.use(Router);
console.log(process);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL, // get vue.config.js publicPath
  routes,
  scrollBehavior: () => ({ y: 0 })
});
