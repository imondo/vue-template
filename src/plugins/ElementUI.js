import 'element-plus/lib/theme-chalk/index.css';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import { locale } from 'element-plus';
if (typeof locale === 'function') {
  locale(lang); // dev
} else {
  // @ts-ignore
  locale.use(lang); // production
}

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
  ElRadioGroup,
  ElCheckbox,
  ElDatePicker,
  ElLoading,
  ElDialog
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
      .use(ElRadioGroup)
      .use(ElCheckbox)
      .use(ElDatePicker)
      .use(ElDialog)
      .use(ElLoading);
    app.config.globalProperties.$ELEMENT = {
      size: 'medium',
      zIndex: 3000
    };
  }
};
