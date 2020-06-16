<template>
  <div class="logo">
    后台管理系统
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
