import LayoutMain from './LayoutMain/index.vue';
import LayoutCard from './LayoutCard/index.vue';
import Icon from './Icon/Icon.jsx';

import BaseTable from './BaseTable/index.vue';

const comps = {
  LayoutMain,
  LayoutCard,
  Icon,
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
