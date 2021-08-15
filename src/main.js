import { createApp } from 'vue';
import App from './App.vue';
import ElementUI from './plugins/ElementUI';
import GlobalComponents from './components';

import './styles/index.less';
import router from './routes';
import store from './store';
import './permission';

import Storage from './utils/Storage';
import message from './utils/message';

console.log(import.meta.env);

const app = createApp(App);

app.config.globalProperties.$storage = Storage();
app.config.globalProperties.$message = message;

app.use(ElementUI).use(GlobalComponents).use(router).use(store).mount('#app');
