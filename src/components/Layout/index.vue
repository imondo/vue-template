<template>
  <div :class="classObj" class="layout">
    <sidebar class="sidebar-wapper" />
    <div class="main-container">
      <navbar class="nav-bar-wapper" />
      <app-main />
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
