import router from './router';
import store from './store';
import NProgress from 'nprogress';

import localRoute from './config/localRoute';

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  await store.dispatch('GetMenu', localRoute);
  next();
});

router.afterEach(() => {
  NProgress.done();
});
