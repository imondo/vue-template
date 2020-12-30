<template>
  <a-card class="card-shadow">
    <slot></slot>
  </a-card>
</template>

<script>
export default {
  name: 'LayoutCard'
};
</script>

<style lang="less" scoped>
.card-shadow {
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
