<template>
  <div class="nav-bar">
    navbar
  </div>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.nav-bar {
  height: $navHeight;
  line-height: $navHeight;
  background-color: #3455b6;
  color: #fff;
}
</style>
