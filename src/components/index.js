import { defineAsyncComponent } from 'vue';

const asyncImport = comp => defineAsyncComponent(() => import(comp));

const comps = {
  LayoutMain: asyncImport('./LayoutMain/index.vue')
};

export default {
  install(app) {
    Object.keys(comps).forEach(component => {
      app.component(component, comps[component]);
    });
    return app;
  }
};
