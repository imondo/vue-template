<template>
  <div class="nav-bar">
    <Hamburger :is-active="sidebar.opened" class="hamburger-container" @click="toggleSideBar"/>
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
}
</style>
