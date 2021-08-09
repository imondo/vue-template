import LayoutMain from './LayoutMain/index.vue';
import LayoutCard from './LayoutCard/index.vue';

import BaseTable from './BaseTable/index.vue';
import Icon from './Icon/index.jsx';

const comps = {
  LayoutMain,
  LayoutCard,
  BaseTable,
  Icon
};

export default {
  install(app) {
    Object.keys(comps).forEach(component => {
      app.component(component, comps[component]);
    });
    return app;
  }
};
