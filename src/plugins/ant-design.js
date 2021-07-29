import 'ant-design-vue/lib/style/index.css';

import {
  Button,
  message,
  Menu,
  Card,
  Form,
  Input,
  Select,
  Switch,
  Radio,
  Checkbox,
  DatePicker,
  Table,
  Pagination
} from 'ant-design-vue';

export default {
  install(app) {
    app
      .use(Button)
      .use(Menu)
      .use(Card)
      .use(Form)
      .use(Input)
      .use(Select)
      .use(Switch)
      .use(Radio)
      .use(Checkbox)
      .use(DatePicker)
      .use(Pagination)
      .use(Table);
    app.config.globalProperties.$message = message;
  }
};
