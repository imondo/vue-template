<template>
  <el-scrollbar wrap-class="scrollbar">
    <div class="sidebar-menu">
      <el-menu
        :show-timeout="200"
        :default-active="isActive($route)"
        mode="vertical"
        background-color="#537bf0"
        text-color="#fff"
      >
        <Logo />
        <template v-for="route in routes">
          <SideItem
            :item="route"
            :key="route.path"
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
import { mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  components: {
    SideItem,
    Logo
  },
  computed: {
    ...mapGetters(['menu', 'routes'])
  },
  created() {
    console.log(this.routes);
  },
  methods: {
    isActive(route) {
      const {
        meta: { parentName = '' }
      } = route;
      if (parentName) {
        const routePath = this.getRoutePath(this.routes, parentName);
        const path = routePath.join('/');
        console.log(path);
        return path;
      }
      console.log(route.path);
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
