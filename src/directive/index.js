import focus from './auto-focus.js';
import merge from './merge-table.js';

const directives = {
  focus,
  merge
};

export default {
  install: Vue => {
    Object.keys(directives).map(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
