<template>
  <div>
    <h1>{{ route.name }}</h1>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
export default {
  name: 'About',
  setup() {
    const route = ref(useRoute());
    return {
      route
    };
  }
};
</script>

<style lang="less" scoped></style>
