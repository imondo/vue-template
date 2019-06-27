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
  render(h) {
    const scopedSlots = this.$scopedSlots.default({
      cellState: this.cellState,
      validateCell: this.validateCell
    });
    return (
      <div
        class={[
          'edit-table-cell',
          { 'edit-table-cell-error': !!this.cellState.errMsg }
        ]}
        on-mouseenter={() => {
          const hasErr = !!this.cellState.errMsg;
          if (!hasErr) return;
          this.cellState.hovering = true;
        }}
        on-mouseleave={() => {
          const hasErr = !!this.cellState.errMsg;
          if (!hasErr) return;
          this.cellState.hovering = false;
        }}
      >
        <error-tooltip
          content={this.cellState.errMsg}
          hovering={this.cellState.hovering}
        >
          <div class='edit-table-cell-content'>
            { scopedSlots }
          </div>
        </error-tooltip>
      </div>
    );
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
