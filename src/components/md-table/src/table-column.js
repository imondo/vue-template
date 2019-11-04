import { parseWidth, parseMinWidth } from './../utils';
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
    },
    width: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: ''
    },
    fixed: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      column: []
    };
  },
  computed: {
    parent() {
      return this.$parent;
    },

    realWidth() {
      return parseWidth(this.width);
    },

    realMinWidth() {
      return parseMinWidth(this.minWidth);
    },

    realFixed() {
      return typeof this.fixed === 'string' ? this.fixed : this.fixed && 'left';
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const columnConfig = {
        label: this.label,
        prop: this.prop
      };
      this.setColumnsWidth(columnConfig);
      this.setFixedColumns(columnConfig);
      this.parent.columns.push(columnConfig);
    },
    setColumnsWidth(column) {
      if (this.realWidth) {
        column.width = this.realWidth;
      }
      if (this.realMinWidth) {
        column.minWidth = this.realMinWidth;
      }
      if (!column.minWidth) {
        column.minWidth = 80;
      }
      return column;
    },
    setFixedColumns(column) {
      if (this.realFixed) {
        if (this.realFixed === 'left') {
          this.parent.fixedColumns.push(column);
        }
        if (this.realFixed === 'right') {
          this.parent.rightFixedColumns.push(column);
        }
      }
    }
  },
  render(h) {
    return h('div', this.$slots.default);
  }
};
