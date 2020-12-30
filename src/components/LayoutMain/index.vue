<template>
  <LayoutCard class="app-container-top">
    <slot name="appTop"></slot>
  </LayoutCard>
  <LayoutCard class="app-container-content">
    <slot name="appContent"></slot>
  </LayoutCard>
</template>

<script>
import LayoutCard from '../LayoutCard/index.vue';
export default {
  name: 'LayoutMain',
  components: {
    LayoutCard
  }
};
</script>

<style lang="less" scoped>
.app-container-content {
  margin-top: 20px;
}
</style>
