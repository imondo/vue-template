import LayoutMain from './LayoutMain/index.vue';
import LayoutCard from './LayoutCard/index.vue';

import BaseTable from './BaseTable/index.vue';

const comps = {
  LayoutMain,
  LayoutCard,
  BaseTable
};

export default {
  install(app) {
    Object.keys(comps).forEach(component => {
      app.component(component, comps[component]);
    });
    return app;
  }
};
