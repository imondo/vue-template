<template>
  <ElSubmenu :index="menuInfo.key" v-bind="$attrs">
    <template #title>
      <span>
        <!-- <Icon class="sidebar-icon" :type="getIcon(menuInfo)" /> -->
        <span>{{ menuInfo.name }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children">
      <template v-if="!item.children">
        <ElMenuItem
          :index="item.key"
          :key="item.key"
          :route="{ name: item.key }"
        >
          <!-- <Icon class="sidebar-icon" :type="getIcon(item)" /> -->
          <span>{{ item.name }}</span>
        </ElMenuItem>
      </template>
      <template v-else>
        <Submenu :menu-info="item" :key="item.key" />
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
