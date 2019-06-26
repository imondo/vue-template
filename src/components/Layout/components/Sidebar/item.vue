<template>
  <div class="menu-item">
    <template v-if="hasOneShowingChild(item.children, item)">
      <router-link :to="{ path: resolvePath(onlyOneChild.path) }">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i :class="setIocn(onlyOneChild)" class="svg-icon"></i>
          <span slot="title">{{ onlyOneChild.meta&&onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>
    <template v-else-if="item.children && item.children.length">
      <el-submenu :index="resolvePath(item.path)">
        <template slot="title">
          <i :class="setIocn(item)" class="svg-icon"></i>
          <span>{{ item.meta && item.meta.title }}</span>
        </template>
        <template v-for="menu in item.children">
          <router-link
            v-if="menu.meta && !menu.meta.hidden"
            :key="menu.path"
            :to="{ path: resolvePath(menu.path) }"
          >
            <el-menu-item :index="resolvePath(menu.path)">{{
              menu.meta.title
            }}</el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
    <template v-else>
      <router-link v-if="item.meta&&!item.meta.hidden" :key="item.path" :to="{ path: resolvePath(item.path) }">
        <el-menu-item :index="resolvePath(item.path)">
          <i :class="setIocn(item)" class="svg-icon"></i>
          <span slot="title">{{ item.meta&&item.meta.title }}</span>
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
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    /**
     * 是否只显示子级菜单
     */
    hasOneShowingChild(children, parent) {
      if (!children) return;
      const showingChildren = children.filter(item => {
        const {
          meta: { hidden }
        } = parent;
        if (hidden && !item.meta.hidden) {
          this.onlyOneChild = item;
          return true;
        } else {
          return false;
        }
      });
      if (showingChildren && showingChildren.length) {
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath;
      }
      if (routePath === 'index') {
        return path.resolve(this.basePath);
      }
      return path.resolve(this.basePath, routePath);
    },
    setIocn(item) {
      return (item.meta && item.meta.icon) ? item.meta.icon : 'el-icon-s-operation';
    },
    isExternalLink(routePath) {
      return isExternal(routePath);
    }
  }
};
</script>

<style lang="scss" scoped></style>
