import router from './routes';
import store from './store';

router.beforeEach(async (to, from, next) => {
  if (!store.getters.mapMenuList?.length) {
    await store.dispatch('menu/GetMenuList');
    next({ ...to });
  } else {
    next();
  }
});
