import { defineAsyncComponent } from 'vue';

const asyncImport = comp =>
  defineAsyncComponent(() => import(/* @vite-ignore */ comp));

const comps = {
  LayoutMain: asyncImport('./LayoutMain/index.vue'),
  LayoutCard: asyncImport('./LayoutCard/index.vue'),
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
