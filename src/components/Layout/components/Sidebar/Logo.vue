<template>
  <div class="logo">
    <a href="https://github.com/one-pupil/vue-template" target="_blank">
      <SvgIcon icon-class="github"/>
    </a>
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
