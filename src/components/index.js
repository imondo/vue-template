import Vue from 'vue';
const contexts = require.context('../components', true, /\.vue$/);
contexts.keys().forEach(component => {
  if (component.includes('Chart')) return;
  const componentEntity = contexts(component).default;
  if (componentEntity.name) {
    Vue.component(componentEntity.name, componentEntity);
  }
});
