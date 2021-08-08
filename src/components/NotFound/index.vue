<template>
  <el-result title="404" subTitle="抱歉，404">
    <template #icon>
      <el-image
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      ></el-image>
    </template>
    <template #extra>
      <el-button type="primary" @click="onClick">首页</el-button>
    </template>
  </el-result>
</template>
<script setup>
import { ElResult } from 'element-plus';
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance()
const onClick = () => proxy.$router.push('/');
</script>
