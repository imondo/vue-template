<template>
  <el-config-provider :locale="locale">
    <slot name="app"></slot>
  </el-config-provider>
</template>
<script>
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
export default {
  name: 'ZhProvider',
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  setup() {
    let locale = zhCn;
    return {
      locale
    };
  }
};
</script>

<style scoped lang="less"></style>
