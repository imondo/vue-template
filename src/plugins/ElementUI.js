import 'element-plus/lib/theme-chalk/index.css';

import {
  ElRow,
  ElCol,
  ElButton,
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
      .use(ElRow)
      .use(ElCol)
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
    app.config.globalProperties.$ELEMENT = { size: 'medium', zIndex: 3000 };
  }
};
