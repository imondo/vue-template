<template>
  <el-config-provider :locale="locale" :loading="loading">
    <slot name="app"></slot>
  </el-config-provider>
</template>
<script>
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { useStore } from 'vuex';
export default {
  name: 'ZhProvider',
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  setup() {
    let locale = zhCn;
    const store = useStore();
    return {
      locale,
      loading: store.state.loading
    };
  }
};
</script>

<style scoped lang="less"></style>
