<template>
  <layout-main>
    <template #appTop>
      <h1>Home</h1>
    </template>
    <template #appContent>
      <Icon type="icon-tuichu" :size="16" />
      <el-button type="primary" @click="onClick">点击</el-button>
    </template>
  </layout-main>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

/* eslint-disable no-unused-vars */
const onClick = () => {
  proxy.$message.info('这阿达');
};
</script>

<style lang="less" scoped></style>
