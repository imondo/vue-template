import LayoutMain from './LayoutMain/index.vue'
import LayoutCard from './LayoutCard/index.vue'
import Icon from './Icon/Icon.jsx'


const comps = {
  LayoutMain,
  LayoutCard,
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
