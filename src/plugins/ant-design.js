import 'ant-design-vue/dist/antd.css';
import { Button, message, Menu, Card } from 'ant-design-vue';

export default {
  install(app) {
    app.use(Button).use(Menu).use(Card);
    app.config.globalProperties.$message = message;
  }
};
