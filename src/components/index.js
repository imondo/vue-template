import Vue from 'vue';
const contexts = require.context('../components', true, /\.vue$/);
contexts.keys().forEach(component => {
  if (component.includes('Layout')) return;
  const componentEntity = contexts(component).default;
  if (componentEntity.name) {
    Vue.component(componentEntity.name, componentEntity);
  }
});

import MdTableColumn from './md-table-column';

Vue.component(MdTableColumn.name, MdTableColumn);
