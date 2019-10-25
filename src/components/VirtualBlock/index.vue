<template>
  <div class="virtual-block">
    <slot
      :data="visibleData"
      :multiple="multipleList"
      :index="startIndex"
      :select="select"
      :select-all="selectAll"
    />
  </div>
</template>

<script>
import { findComponentDownward, debounce } from './utils';
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
    }
  },
  data() {
    return {
      multipleTableMap: new Set(), // 选中数据集合
      multipleList: [],
      visibleData: [],
      domMap: null, // dom集合
      startIndex: 0,
      refTable: null,
      checkAll: false // 是否表格全选
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
    this.bindEvents();
  },
  methods: {
    // 加载全部数据
    loadData(val) {
      if (val.length) {
        this.$nextTick().then(() => {
          this.createElementHeight();
          this.updateVisibleData();
        });
      }
    },
    // 需要操作DOM集合
    eleMap() {
      const selectWrap = this.$el.querySelector('.el-table__body-wrapper'); // el-table__fixed-body-wrapper
      const selectTable = this.$el.querySelector('.el-table');
      const selectRow = this.$el.querySelector('.el-table table tr');
      const selectTbody = selectWrap.querySelector('table');
      const fixedWrap = this.$el.querySelector('.el-table__fixed-body-wrapper');
      const head = this.$el.querySelector(
        '.el-table__header thead label .el-checkbox__input'
      );
      const fixedHead = this.$el.querySelector(
        '.el-table__fixed-header-wrapper thead label .el-checkbox__input'
      );
      return {
        selectWrap,
        selectTable,
        selectRow,
        selectTbody,
        fixedWrap,
        head,
        fixedHead
      };
    },
    // 滚动事件绑定
    bindEvents() {
      this.$nextTick().then(() => {
        this.refTable = findComponentDownward(this, 'ElTable');
        this.domMap = this.eleMap();
        const { selectWrap } = this.domMap;
        // 监听表格滚动
        selectWrap.addEventListener('scroll', this.handleScroll);
        this.$once('hook:beforeDestroy', () => {
          window.removeEventListener('scroll', this.handleScroll);
        });
      });
    },
    // 获取表格行高
    getRowHeight() {
      const { selectRow } = this.domMap;
      const rowHeight = selectRow ? selectRow.clientHeight : 40;
      return rowHeight;
    },
    // 创建高度元素
    createElementHeight() {
      const { selectWrap, selectTable } = this.domMap;
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
      this.insertElement(ele);
    },
    // 插入新增元素
    insertElement(ele) {
      const { fixedWrap, selectWrap, selectTbody } = this.domMap;
      // 存在固定列处理
      if (fixedWrap) {
        const fixedTbody = fixedWrap.querySelector('table');
        fixedWrap.insertBefore(ele, fixedTbody);
      }
      selectWrap.insertBefore(ele, selectTbody);
    },
    // 更新表格数据
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      const { selectWrap } = this.domMap;
      const rowHeight = this.getRowHeight();
      const visibleCount = Math.ceil(selectWrap.clientHeight / rowHeight);
      const start = Math.floor(scrollTop / rowHeight);
      const end = start + visibleCount;
      this.startIndex = start;
      this.visibleData = this.list.slice(start, end);
      this.renderRows(start, end);
      this.renderCheckStatus();
      this.updateMarginTop(start, rowHeight);
    },
    updateMarginTop(start, rowHeight) {
      const { selectTbody, fixedWrap } = this.domMap;
      const marginTop = start * rowHeight;
      // selectTbody.style.marginTop = `${marginTop}px`;
      selectTbody.style.transform = `translate3d(0px, ${marginTop}px, 0px)`;
      if (fixedWrap) {
        const fixedTbody = fixedWrap.querySelector('table');
        // fixedTbody.style.marginTop = `${marginTop}px`;
        fixedTbody.style.transform = `translate3d(0px, ${marginTop}px, 0px)`;
        // transform: translate3d(0px, 25871px, 0px);
      }
    },
    // 滚动表格
    handleScroll(e) {
      const { selectWrap } = this.domMap;
      const scrollTop = selectWrap.scrollTop;
      // y轴滚动监听
      if (scrollTop >= 0) {
        window.requestAnimationFrame(() => {
          debounce(this.updateVisibleData(scrollTop), 1000);
        });
      }
    },
    // 更新序号
    renderRows(start, end) {
      const { visibleData } = this;
      visibleData.forEach((row, rowIndex) => {
        row.$index = start + rowIndex;
      });
    },
    // 更新选中状态
    renderCheckStatus() {
      this.$nextTick().then(() => {
        const {
          checkAll,
          visibleData,
          refTable,
          multipleTableMap,
          renderHeadCheckbox
        } = this;
        renderHeadCheckbox();
        visibleData.forEach((row, rowIndex) => {
          if (checkAll) {
            refTable.toggleRowSelection(row);
          } else {
            const hasRow = multipleTableMap.has(row);
            hasRow && refTable.toggleRowSelection(row);
          }
        });
      });
    },
    // 点击单条数据选中操作
    select(selection, row) {
      const { multipleTableMap, refTable, renderHeadCheckbox, list } = this;
      const hasRow = multipleTableMap.has(row);
      if (hasRow) {
        multipleTableMap.delete(row);
      } else {
        multipleTableMap.add(row);
      }
      this.checkAll = multipleTableMap.size === list.length;
      renderHeadCheckbox();
      refTable.toggleRowSelection(row, !hasRow);
      this.multipleList = Array.from(multipleTableMap);
      this.$emit('selection-change', this.multipleList);
    },
    // 全选操作
    selectAll(selection) {
      this.multipleTableMap.clear();
      this.checkAll = !!selection.length;
      if (this.checkAll) {
        this.multipleList = this.list;
        this.multipleTableMap = new Set(this.list);
        this.$emit('selection-change', this.multipleList);
      }
    },
    // 表格全选框样式
    renderHeadCheckbox() {
      this.$nextTick().then(() => {
        const { multipleTableMap, checkAll } = this;
        const { head, fixedHead } = this.domMap;
        if (!checkAll && multipleTableMap.size > 0) {
          if (fixedHead) {
            fixedHead.classList.remove('is-checked'); // 去掉全选状态
            fixedHead.classList.add('is-indeterminate'); // 半选状态
          }
          head.classList.remove('is-checked'); // 去掉全选状态
          head.classList.add('is-indeterminate'); // 半选状态
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
