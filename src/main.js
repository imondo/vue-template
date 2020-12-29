import { createApp } from 'vue';
import App from './App.vue';
import AntDesign from './plugins/ant-design';
import './styles/index.less';
import router from './routes';

console.log(import.meta.env);

const app = createApp(App);

app.use(AntDesign).use(router).mount('#app');
