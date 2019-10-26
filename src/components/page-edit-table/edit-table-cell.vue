<template>
  <div
    ref="tooltip"
    class="edit-table-cell"
    :class="{'edit-table-cell-error': !!cellState.errMsg}"
    @mouseenter="handleMouseEnter(cellState, rowState)"
    @mouseleave="handleMouseLeave(cellState, rowState)"
    @click="handleClickCell(cellState, rowState)"
  >
    <error-tooltip v-if="!isHidden&&cellState.edit" :content="cellState.errMsg" :hovering="cellState.hovering">
      <div class="edit-table-cell-content">
        <!-- 是否input -->
        <el-input
          v-if="isInput"
          v-model="row[prop]"
          v-bind="$attrs"
          clearable
          @input="validateCell"
        ></el-input>
        <!-- 其他slot插入 -->
        <slot v-else :cellState="cellState" :validateCell="validateCell"></slot>
      </div>
    </error-tooltip>
    <span v-else>{{ row[prop] }}</span>
  </div>
</template>

<script>
export default {
  name: 'EditTableCell',
  inject: ['editTable'],
  props: {
    row: {
      required: true,
      type: Object,
      default: () => {}
    },
    prop: {
      required: true,
      type: String,
      default: ''
    },
    slotName: {
      type: String,
      default: ''
    },
    cellStates: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isHidden: false
    };
  },
  computed: {
    isInput() {
      return this.slotName === 'input';
    },
    rowState() {
      const states = this.editTable.store.states;
      const rowState = states.get(this.row);
      return rowState;
    },
    cellState() {
      const cellState = this.rowState.get(this.prop);
      return cellState;
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.isHidden = this.checkIsHidden();
    });
  },
  methods: {
    checkIsHidden() {
      const $td = this.$refs.tooltip.offsetParent;
      const isHidden = $td.className.includes('is-hidden');
      return isHidden;
    },
    handleMouseEnter(cellState, rowState) {
      const hasErr = !!cellState.errMsg; // 存在错误
      if (!hasErr) return;
      cellState.hovering = true;
    },
    handleMouseLeave(cellState, rowState) {
      const hasErr = !!cellState.errMsg; // 存在错误
      if (!hasErr) return;
      cellState.hovering = false;
    },
    // 点击当前行编辑
    handleClickCell(cellState, rowState) {
      const { cellEdit } = this.editTable.store;
      this.hideCellEditState();
      if (cellEdit && !cellState.edit) {
        cellState.edit = true;
      }
    },
    // 点击当前行其他列隐藏编辑
    hideCellEditState() {
      const curRow = this.row; // 当前行
      const curProp = this.prop; // 当前列字段
      const { cellEdit, states, list } = this.editTable.store;
      const len = list.length;
      for (let i = 0; i < len; i++) {
        const row = list[i];
        const rowState = states.get(row); // 当前行状态
        // 点击当前行
        if (row === curRow) {
          for (const prop of rowState.keys()) {
            // 其它列状态
            if (prop !== curProp) {
              const otherCell = rowState.get(prop);
              const { errMsg } = otherCell;
              if (cellEdit && !errMsg) {
                otherCell.edit = false;
              }
            }
          }
        } else {
          for (const prop of rowState.keys()) {
            const otherCell = rowState.get(prop);
            const { errMsg } = otherCell;
            if (cellEdit && !errMsg) {
              otherCell.edit = false;
            }
          }
        }
      }
    },
    // 验证
    validateCell(cb) {
      this.editTable
        .verifyTableCell(this.row, this.prop, this.cellState, this.rowState)
        .then(errMsg => {
          const valid = !errMsg;
          typeof cb === 'function' && cb(valid);
        });
    },
    restCell() {
      this.editTable.restTableCell(this.row, this.prop);
    }
  }
};
</script>

<style lang="scss">
.edit-table-cell .edit-table-cell-content {
  outline: none;
}
.edit-table-cell .el-autocomplete,
.edit-table-cell .el-select,
.edit-table-cell .el-date-editor.el-input__inner,
.edit-table-cell .el-date-editor.el-input {
  width: 100%;
}

.edit-table-cell-error .el-input__inner,
.edit-table-cell-error .el-input__inner:focus,
.edit-table-cell-error .el-input__inner:hover,
.edit-table-cell-error .el-textarea__inner,
.edit-table-cell-error .el-textarea__inner:focus {
  border-color: #f56c6c;
}
</style>
