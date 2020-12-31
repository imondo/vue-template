<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$attrs">
    <template #title>
      <span>
        <Icon class="sidebar-icon" :icon="getIcon(menuInfo)" />
        <span>{{ menuInfo.name }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <Icon class="sidebar-icon" :icon="getIcon(item)" />
          <span>{{ item.name }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <Submenu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  name: 'Submenu',
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
