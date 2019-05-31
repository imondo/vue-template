import store from '@/store';

export function logout() {
  store
    .dispatch('LogOut')
    .then(() => {
      localLogout();
    })
    .catch(() => {
      localLogout();
    });
}

function localLogout() {
  store.dispatch('ClearToken').then(() => {
    window.location.href = store.getters.api.IPRTAL_LOGOUT_HREF;
  });
}
