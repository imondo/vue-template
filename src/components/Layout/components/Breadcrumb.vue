<template>
  <el-breadcrumb class="breadcrumb-wap" separator="/">
    <template v-for="{name, meta, path} in list">
      <el-breadcrumb-item :key="path" :to="{ name }">{{ meta&&meta.title }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      list: []
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    isHome(route) {
      console.log(route);
      const { name } = route;
      return name === 'Index';
    },
    getBreadcrumb() {
      const { matched } = this.$route;
      this.list = this.isHome(matched[0]) ? [matched[1]] : matched;
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb-wap {
  padding-bottom: 10px;
}
</style>
