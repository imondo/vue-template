import MdTableColumn from '../md-table/src/table-column';

MdTableColumn.install = function(Vue) {
  console.log(MdTableColumn);
  Vue.component(MdTableColumn.name, MdTableColumn);
};

export default MdTableColumn;
