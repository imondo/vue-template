import 'ant-design-vue/dist/antd.css';
import { Button, message, Menu, Card } from 'ant-design-vue';

export default {
  install(app) {
    app.use(Button);
    app.use(Menu);
    app.use(Card);
    app.config.globalProperties.$message = message;
  }
};
