import { createApp } from 'vue';
import App from './App.vue';
import AntDesign from './plugins/ant-design';
import GlobalComponents from './components';

import './styles/index.less';
import router from './routes';
// import './permission';

console.log(import.meta.env);

const app = createApp(App);

app.use(AntDesign).use(GlobalComponents).use(router).mount('#app');
