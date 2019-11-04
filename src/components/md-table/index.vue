<template>
  <div class="md-table md-table--border">
    <div ref="hiddenColumns" class="hidden-columns">
      <slot></slot>
    </div>
    <div ref="tableHeader" class="md-table__header-wrapper">
      <MdTableHeader />
    </div>
    <div ref="tableBody" :style="[bodyHeight]" class="md-table__body-wrapper">
      <MdTableBody />
    </div>
  </div>
</template>

<script>
import MdTableHeader from './src/table-header';
import MdTableBody from './src/table-body';
import Store from './src/store';
import { parseHeight } from './utils';

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
    },
    height: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      columns: [],
      fixedColumns: [],
      rightFixedColumns: [],
      bodyHeight: null,
      hasGutter: false
    };
  },
  computed: {
    tableHeight() {
      return this.height ? parseHeight(this.height) : 10;
    }
  },
  watch: {
    data: {
      handler: 'initLoadData'
    }
  },
  created() {
    this.store = new Store();
    console.log(this);
  },
  mounted() {},
  methods: {
    initLoadData(val) {
      if (val) {
        this.$nextTick(() => {
          this.setBodyHeight();
          this.bindBodyScroll();
        });
      }
    },
    setBodyHeight() {
      if (this.height) {
        const tableHeader = this.$refs.tableHeader;
        const tableBody = this.$refs.tableBody;
        const realTableHeight = this.tableHeight - tableHeader.clientHeight;
        this.hasGutter = tableBody.clientHeight >= realTableHeight;
        if (this.hasGutter) {
          this.bodyHeight = {
            height: `${realTableHeight}px`
          };
        }
      }
    },
    bindBodyScroll() {
      const tableBody = this.$refs.tableBody;
      tableBody.addEventListener('scroll', this.onBodyScroll);
    },
    onBodyScroll() {
      const tableBody = this.$refs.tableBody;
      const { scrollTop, scrollLeft } = tableBody;
      console.log(scrollTop, scrollLeft);
      if (scrollLeft > 0) {
        
      }
    }
  }
};
</script>

<style lang="less">
@import url('./index.less');
</style>
