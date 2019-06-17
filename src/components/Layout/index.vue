<template>
  <div :class="classObj" class="layout">
    <Sidebar class="sidebar-wapper" />
    <div class="main-container">
      <Navbar class="nav-bar-wapper" />
      <AppMain />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar } from './components';
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: this.sidebar.opened,
        openSidebar: !this.sidebar.opened
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
