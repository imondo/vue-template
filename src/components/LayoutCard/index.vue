<template>
  <el-card class="card-shadow">
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  name: 'LayoutCard'
};
</script>

<style lang="less" scoped>
.card-shadow {
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 10%);
}
</style>
