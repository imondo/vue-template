<template>
  <el-result subTitle="抱歉，页面丢失">
    <template #icon>
      <el-image src="/images/404.png"></el-image>
    </template>
    <template #extra>
      <el-button type="primary" @click="onClick">首页</el-button>
    </template>
  </el-result>
</template>
<script setup>
import { ElResult } from 'element-plus';
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
const onClick = () => proxy.$router.push('/');
</script>
