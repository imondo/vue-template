<template>
  <div class="logo">
    <i class="el-icon-discover"></i>
  </div>
</template>

<script>
export default {
  name: 'Logo'
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.logo {
  height: $navHeight;
  line-height: $navHeight;
  font-size: 24px;
  text-align: center;
  color: #fff;
}
</style>
