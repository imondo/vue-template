import router from './routes';
import store from './store';

router.beforeEach(async (to, from, next) => {
  await store.dispatch('GetMenuList');
  next();
});
