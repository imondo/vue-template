<template>
  <div ref="virtual" class="virtual-block">
    <slot :data="visibleData" :index="startIndex"/>
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
    },
    // 选中的数据
    selection: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visibleData: [],
      startIndex: 0
    };
  },
  watch: {
    list: {
      handler: 'loadData'
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
    loadData(val) {
      if (val.length) {
        this.$nextTick().then(() => {
          this.createElementHeight();
          this.updateVisibleData();
        });
      }
    },
    eleMap() {
      const selectWrap = this.$el.querySelector('.el-table__body-wrapper'); // el-table__fixed-body-wrapper
      const selectTable = this.$el.querySelector('.el-table');
      const selectRow = this.$el.querySelector('.el-table table tr');
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
      this.startIndex = start;
      this.visibleData = this.list.slice(start, end);
      this.renderRows(start, end);
      const marginTop = start * rowHeight;
      selectTbody.style.marginTop = `${marginTop}px`;
    },
    handleScroll(e) {
      const selectWrap = this.$el.querySelector('.el-table__body-wrapper');
      const scrollTop = selectWrap.scrollTop;
      // y轴滚动监听
      if (scrollTop >= 0) {
        window.requestAnimationFrame(() => {
          this.debounce(this.updateVisibleData(scrollTop), 100);
        });
      }
    },
    // 更新序号
    renderRows(start, end) {
      const { visibleData } = this;
      visibleData.forEach((row, rowIndex) => {
        row.$index = start + rowIndex + 1;
      });
    },
    debounce(func, wait, immediate) {
      let timeout, args, context, timestamp, result;

      const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
          if (!immediate) {
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          }
        }
      };

      return function(...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }

        return result;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
