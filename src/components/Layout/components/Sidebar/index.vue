<template>
  <el-scrollbar wrap-class="scrollbar">
    <div class="sidebar-menu">
      <el-menu mode="vertical" background-color="#537bf0" text-color="#fff">
        <Logo />
        <template v-for="route in menu">
          <SideItem
            :item="route"
            :key="route.href"
            :base-path="`/pms/${route.href}`"
          />
        </template>
      </el-menu>
    </div>
  </el-scrollbar>
</template>

<script>
import SideItem from './item';
import Logo from './Logo';
import { mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  components: {
    SideItem,
    Logo
  },
  computed: {
    ...mapGetters(['menu'])
  },
  created() {
    console.log(this.menu);
  }
};
</script>

<style lang="scss" scoped></style>
