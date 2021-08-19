import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from './routes';
import store from './store';

const whiteList = ['/login', '/404'];

router.beforeEach(async (to, _, next) => {
  NProgress.start();
  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (!store.getters.mapMenuList?.length) {
        await store.dispatch('menu/GetMenuList');
        next({ ...to });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
});

router.afterEach(to => {
  NProgress.done();
});
