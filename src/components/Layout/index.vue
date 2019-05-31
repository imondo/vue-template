<template>
  <div class="layout">
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
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.sidebar-wapper {
  transition: width 0.28s;
  width: $mainLeft !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.main-container {
  padding-left: $mainLeft;
}
</style>
