import Vue from 'vue';
import Router from 'vue-router';
import routes from './modules/routes';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/pms/', // process.env.BASE_URL
  scrollBehavior: () => ({ y: 0 }),
  routes
});
