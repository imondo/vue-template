<template>
  <div class="nav-bar">
    <Hamburger :is-active="sidebar.opened" class="hamburger-container" @click="toggleSideBar"/>
    <div class="fr nav-right">
      <el-button type="text" icon="el-icon-switch-button" @click="handleClick">退出</el-button>
    </div>
  </div>
</template>

<script>
import Hamburger from './Hamburger';
import { mapGetters } from 'vuex';
export default {
  name: 'Navbar',
  components: {
    Hamburger
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar');
    },
    handleClick() {
      this.$store.dispatch('Logout');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.nav-bar {
  height: $navHeight;
  line-height: $navHeight;
  background-color: $navBg;
  color: #fff;
  border-bottom: 1px solid #dcdfe6;
}
.hamburger-container {
  display: inline-block;
}
.nav-right {
  padding: 0 10px;
}
</style>
