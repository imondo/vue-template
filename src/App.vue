<template>
  <ZhProvider>
    <template #app>
      <router-view></router-view>
    </template>
  </ZhProvider>
</template>

<script setup>
import ZhProvider from '@/components/ZhProvider/index.vue';
</script>
