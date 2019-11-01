import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      column: []
    };
  },
  methods: {
    getColumns(column) {
      this.column.push(column);
    }
  }
});
