<template>
  <div class="app-main">
    <router-view :key="key" />
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  padding: 10px;
}
</style>
