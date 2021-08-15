<template>
  <ElSubmenu :index="menuInfo.path" v-bind="$attrs">
    <template #title>
      <i v-if="getIcon(menuInfo)" :class="getIcon(menuInfo)"></i>
      <span>{{ menuInfo.name }}</span>
    </template>
    <template v-for="item in menuInfo.children">
      <template v-if="!item.children || !item.children.length">
        <ElMenuItem :index="item.path" :key="item.path">
          <i v-if="getIcon(item)" :class="getIcon(item)"></i>
          <span :class="{ 'pl-10': !getIcon(item) }">{{ item.name }}</span>
        </ElMenuItem>
      </template>
      <template v-else>
        <Submenu :menu-info="item" :key="item.path" />
      </template>
    </template>
  </ElSubmenu>
</template>

<script>
import { ElSubmenu, ElMenuItem } from 'element-plus';
export default {
  name: 'Submenu',
  components: {
    ElSubmenu,
    ElMenuItem
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getIcon(item) {
      if (item?.icon) {
        return item.icon;
      }
      return '';
    }
  }
};
</script>

<style lang="less" scoped></style>
