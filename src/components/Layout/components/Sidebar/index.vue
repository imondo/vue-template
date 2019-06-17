<template>
  <el-scrollbar wrap-class="scrollbar">
    <div class="sidebar-menu">
      <el-menu
        :show-timeout="200"
        :default-active="isActive($route)"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <Logo />
        <template v-for="route in routes">
          <SideItem
            :key="route.path"
            :item="route"
            :base-path="`/${route.path}`"
          />
        </template>
      </el-menu>
    </div>
  </el-scrollbar>
</template>

<script>
import SideItem from './item';
import Logo from './Logo';
import variables from '@/styles/variables.scss';
import { mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  components: {
    SideItem,
    Logo
  },
  computed: {
    ...mapGetters(['menu', 'routes', 'sidebar']),
    isCollapse() {
      return this.sidebar.opened;
    },
    variables() {
      return variables;
    }
  },
  created() {
    console.log(this.routes);
  },
  methods: {
    isActive(route) {
      const {
        meta: { activeMenu = '' }
      } = route;
      if (activeMenu) {
        const routePath = this.getRoutePath(this.routes, activeMenu);
        const path = routePath.join('/');
        return path;
      }
      return route.path;
    },
    getRoutePath(data, target) {
      const path = [];
      let flag = true;
      const whileRoute = (data, target) => {
        data.forEach((item, index) => {
          if (flag) {
            if (index > 0) {
              path.pop();
            }
            path.push(item.path);
            if (item.name === target) {
              flag = false;
              return;
            } else {
              const children = item.children;
              if (children) {
                whileRoute(item.children, target);
              }
            }
          }
        });
        if (flag) path.pop();
        return;
      };
      whileRoute(data, target);
      return path;
    }
  }
};
</script>

<style lang="scss" scoped></style>
