import { createApp } from 'vue';
import App from './App.vue';
import AntDesign from './plugins/ant-design';
import GlobalComponents from './components';

import './styles/index.less';
import router from './routes';
// import './permission';

import Storage from './utils/Storage';

console.log(import.meta.env);

const app = createApp(App);

app.config.globalProperties.$storage = Storage();

app.use(AntDesign).use(GlobalComponents).use(router).mount('#app');
