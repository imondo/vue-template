<template>
  <el-button :loading="loading" size="mini" type="text" @click="onClick">
    <slot></slot>
  </el-button>
</template>

<script setup>
import { defineEmit, defineProps } from 'vue';

const props = defineProps({
  loading: Boolean
});

const emit = defineEmit();

const onClick = () => {
  emit('click');
};
</script>

<style lang="less" scoped></style>
