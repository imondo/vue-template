<template>
  <layout-main>
    <template #appTop>
      <h1>Home</h1>
    </template>
    <template #appContent>
      <Icon icon="fa:home" :size="16" />
      <a-button type="primary" @click="onClick">点击</a-button>
    </template>
  </layout-main>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
  name: 'Home',
  setup() {
    const { proxy } = getCurrentInstance();
    const onClick = () => {
      proxy.$message.info('这阿达');
    };
    return {
      onClick
    };
  }
};
</script>

<style lang="less" scoped></style>
