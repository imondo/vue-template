<template>
  <div class="nav-bar">
    <Hamburger :is-active="sidebar.opened" class="hamburger-container" @click="toggleSideBar"/>
    <div class="fr nav-right">
      <a class="github" href="https://github.com/one-pupil/vue-template" target="_blank">
        <SvgIcon icon-class="github"/>
      </a>
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
      this.$confirm('是否确认退出？', {
        onClose: () => {
          this.$store.dispatch('Logout');
        }
      });
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
  position: relative;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
.hamburger-container {
  display: inline-block;
  cursor: pointer;
  &:hover {
    background: rgba(0,0,0,.025);
  }
}
.nav-right {
  padding: 0 20px;
  font-size: 20px;
  .github {
    padding-right: 10px;
  }
  .el-button--text {
    color: $menuBg;
  }
}
</style>
