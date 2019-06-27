<template>
  <div class="tree-warpper">
    <page-edit-tree :data="list" :default-props="defaultProps"></page-edit-tree>
  </div>
</template>

<script>
import { getTree } from '@/api/list.js';
export default {
  name: 'PageTree',
  data() {
    return {
      list: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const tree = await getTree();
      this.list = tree;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
