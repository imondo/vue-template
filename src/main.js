import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './plugins/element';
import './components/index.js';
import './permission';
import './icons';

import './styles/index.scss';
import './filters/currency.js'; // 金额货币化

import directives from './directive/index.js';
import * as filters from './filters/index.js';

import { toFixed, deepClone, multipleSortList } from './utils/index.js';
import {
  restForm,
  validateForm,
  validatePromiseForm
} from './utils/validate.js';
import { msgAlert, messages } from './utils/msg-box.js';

Vue.use(directives);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.prototype.$restForm = restForm;
Vue.prototype.$validateForm = validateForm;
Vue.prototype.$validatePromiseForm = validatePromiseForm;
Vue.prototype.$messages = messages;
Vue.prototype.$msgAlert = msgAlert;
Vue.prototype.$toFixed = toFixed;
Vue.prototype.$deepClone = deepClone;
Vue.prototype.$multipleSortList = multipleSortList;

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'testing') {
  const { mockXHR } = require('../mock');
  mockXHR();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
