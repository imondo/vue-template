<template>
  <el-config-provider :locale="locale">
    <slot name="app"></slot>
  </el-config-provider>
</template>
<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

export default defineComponent({
  name: 'ZhProvider',
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  setup() {
    return {
      locale: zhCn
    };
  }
});
</script>

<style scoped lang="less"></style>
