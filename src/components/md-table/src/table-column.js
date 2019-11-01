export default {
  name: 'MdTableColumn',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      column: []
    };
  },
  created() {
    const parent = this.$parent;
    const columnConfig = {
      label: this.label,
      prop: this.prop
    };
    parent.columns.push(columnConfig);
  },
  render(h) {
    return h('div', this.$slots.default);
  }
};
