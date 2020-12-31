import { defineAsyncComponent } from 'vue';

const asyncImport = comp => defineAsyncComponent(() => import(comp));

const comps = {
  LayoutMain: asyncImport('./LayoutMain/index.vue'),
  Icon: asyncImport('./Icon/index.jsx')
};

export default {
  install(app) {
    Object.keys(comps).forEach(component => {
      app.component(component, comps[component]);
    });
    return app;
  }
};
