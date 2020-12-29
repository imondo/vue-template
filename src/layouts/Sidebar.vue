<template>
  <div class="basic-sidebar">
    <div class="logo"></div>
    <div class="sidebar">
      <div v-for="(item, index) in menu" :key="index" class="sidebar-item">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="less" scoped>
.basic-sidebar {
  flex: 0 0 180px;
  width: 180px;
  position: relative;
  z-index: 10;
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.25);
  .logo {
    height: 64px;
  }
}
</style>
