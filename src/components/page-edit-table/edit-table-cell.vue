<template>
  <div
    class="edit-table-cell"
    :class="{'edit-table-cell-error': !!cellState.errMsg}"
    @mouseenter="() => cellState.hovering = true"
    @mouseleave="() => cellState.hovering = false"
  >
    <error-tooltip v-if="cellState.edit" :content="cellState.errMsg" :hovering="cellState.hovering">
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
  methods: {
    // 验证
    validateCell(cb) {
      this.editTable
        .verifyTableCell(this.row, this.prop, this.cellState)
        .then(errMsg => {
          const valid = !errMsg;
          typeof cb === 'function' && cb(valid);
        });
    }
  }
};
</script>

<style lang="scss">
.edit-table-cell .edit-table-cell-content{
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
