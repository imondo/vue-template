<template>
  <div ref="virtual" class="virtual-block">
    <slot :data="visibleData" />
  </div>
</template>

<script>
export default {
  name: 'VirtualBlock',
  props: {
    // 表格数据
    list: {
      required: true,
      type: Array,
      default: () => {
        return [];
      }
    },
    // 表格dom
    refKey: {
      required: true,
      type: String,
      default: ''
    },
    // 表格可视区域展示条数
    size: {
      type: Number,
      default: 20
    },
    itemHeight: {
      type: Number,
      default: 40
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visibleData: []
    };
  },
  watch: {
    list: {
      handler: 'loadData',
      immediate: true
    }
  },
  created() {
    this.visibleData = this.list.slice(0, this.size);
  },
  mounted() {
    this.$nextTick().then(() => {
      const selectWrap = this.$el.querySelector('.el-table__body-wrapper');
      // 监听表格滚动
      selectWrap.addEventListener('scroll', this.handleScroll);
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('scroll', this.handleScroll);
      });
    });
  },
  methods: {
    loadData(newVal) {
      this.$nextTick().then(() => {
        this.createElementHeight();
        this.updateVisibleData();
      });
    },
    eleMap() {
      const selectWrap = this.$el.querySelector('.el-table__body-wrapper'); // el-table__fixed-body-wrapper
      const selectTable = this.$el.querySelector('.el-table');
      const selectRow = selectWrap.querySelector('table tr');
      const selectTbody = selectWrap.querySelector('table');
      return { selectWrap, selectTable, selectRow, selectTbody };
    },
    getRowHeight() {
      const { selectRow } = this.eleMap();
      const rowHeight = selectRow ? selectRow.clientHeight : 40;
      return rowHeight;
    },
    // 创建高度元素
    createElementHeight() {
      const { selectWrap, selectTable, selectTbody } = this.eleMap();
      selectTable.classList.add('el-table--scrollable-y');
      const rowHeight = this.getRowHeight();
      const virtualEle = selectWrap.querySelector('.virtual-block-place');
      if (virtualEle) {
        virtualEle.parentNode.removeChild(virtualEle);
      }
      const ele = document.createElement('div');
      const eleHeight = this.list.length * rowHeight;
      ele.setAttribute(
        'style',
        `height: ${eleHeight}px; width: 0; float: left;`
      );
      ele.className = `virtual-block-place`;
      selectWrap.insertBefore(ele, selectTbody);
    },
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      const { selectWrap, selectTbody } = this.eleMap();
      const rowHeight = this.getRowHeight();
      const visibleCount = Math.ceil(selectWrap.clientHeight / rowHeight);
      const start = Math.floor(scrollTop / rowHeight);
      const end = start + visibleCount;
      this.visibleData = this.list.slice(start, end);
      const marginTop = start * rowHeight;
      selectTbody.style.marginTop = `${marginTop}px`;
    },
    handleScroll(e) {
      const selectWrap = this.$el.querySelector('.el-table__body-wrapper');
      const scrollTop = selectWrap.scrollTop;
      // y轴滚动监听
      if (scrollTop > 0) {
        window.requestAnimationFrame(() => {
          this.updateVisibleData(scrollTop);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
