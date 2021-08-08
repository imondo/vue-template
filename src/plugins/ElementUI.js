import 'element-plus/lib/theme-chalk/index.css';

import {
  ElButton,
  ElMessage,
  ElMenu,
  ElCard,
  ElImage,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElSwitch,
  ElRadio,
  ElCheckbox,
  ElDatePicker,
  ElPagination
} from 'element-plus';

export default {
  install(app) {
    app
      .use(ElButton)
      .use(ElMenu)
      .use(ElCard)
      .use(ElImage)
      .use(ElForm)
      .use(ElFormItem)
      .use(ElInput)
      .use(ElSelect)
      .use(ElOption)
      .use(ElSwitch)
      .use(ElRadio)
      .use(ElCheckbox)
      .use(ElDatePicker)
      .use(ElPagination);
    app.config.globalProperties.$message = ElMessage;
  }
};
