import { createApp } from 'vue';
import App from './App.vue';
import ElementUI from './plugins/ElementUI';
import GlobalComponents from './components';

import './styles/index.less';
import router from './routes';
// import './permission';

import Storage from './utils/Storage';

console.log(import.meta.env);

const app = createApp(App);

app.config.globalProperties.$storage = Storage();

app.use(ElementUI).use(GlobalComponents).use(router).mount('#app');
