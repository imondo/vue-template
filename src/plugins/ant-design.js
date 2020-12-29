import 'ant-design-vue/dist/antd.css';
import { Button, message } from 'ant-design-vue';

export default {
  install(app) {
    app.use(Button);
    app.config.globalProperties.$message = message;
  }
};
