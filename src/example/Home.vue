<template>
  <layout-main>
    <template #query>
      <h1>Home</h1>
    </template>
    <template #content>
      <Icon type="icon-tuichu" :size="16" />
      <el-button icon="el-icon-search" type="primary" @click="onClick"
        >点击</el-button
      >
    </template>
  </layout-main>
</template>

<script setup>
import { inject } from 'vue';
import useContext from '@/hooks/useContext';

const { storage, message } = useContext();

const onClick = () => {
  message.success('信息');
  storage.set('a', { a: 1 });
  console.log(storage.get('a'));
};
</script>

<style lang="less" scoped></style>
