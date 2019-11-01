<template>
  <div class="md-table el-table">
    <div ref="hiddenColumns" class="hidden-columns">
      <slot></slot>
    </div>
    <MdTableHeader />
    <MdTableBody />
  </div>
</template>

<script>
import MdTableHeader from './src/table-header';
import MdTableBody from './src/table-body';
import Store from './src/store';
export default {
  name: 'MdTable',
  provide() {
    return {
      table: this
    };
  },
  components: {
    MdTableHeader,
    MdTableBody
  },
  props: {
    data: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: []
    };
  },
  computed: {
    defaultColumnWidth() {
      const width = Math.floor((100 / this.columns.length));
      return `${width}%`;
    }
  },
  created() {
    this.store = new Store();
    console.log(this);
  }
};
</script>

<style lang="less">
@import url('./index.less');
</style>
