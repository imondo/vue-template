<template>
  <div class="menu-item">
    <template v-if="item.children.length">
      <el-submenu :index="item.href">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="menu in item.children">
          <router-link :to="{ path: resolvePath(menu.href) }" :key="menu.herf">
            <el-menu-item :index="menu.herf">{{ menu.name }}</el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
    <template v-else>
      <router-link :to="{ path: resolvePath(item.href) }" :key="item.herf">
        <el-menu-item :index="item.href">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
import path from 'path';
import { isExternal } from '@/utils';

export default {
  name: 'SideItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath;
      }
      if (routePath === 'index') {
        return path.resolve(this.basePath);
      }
      return path.resolve(this.basePath, routePath);
    },
    isExternalLink(routePath) {
      return isExternal(routePath);
    }
  }
};
</script>

<style lang="scss" scoped></style>
