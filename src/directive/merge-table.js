const removeNode = (node, len) => {
  for (let i = len; i > 0; i--) {
    node[i].remove();
  }
};

const direcFn = (el, binding) => {
  const {
    modifiers: { fixed = false, footer = false },
    value = 1
  } = binding;
  setTimeout(() => {
    const queryTd = fixed
      ? '.el-table__fixed .el-table__fixed-body-wrapper tbody'
      : footer
        ? '.el-table__footer .has-gutter'
        : '.el-table__body-wrapper tbody';
    const $table = el.querySelectorAll(queryTd);
    if ($table[0]) {
      const $tr = $table[0].childNodes;
      const len = value - 1;
      const $td = $tr[0].childNodes;
      if ($td.length) {
        if ($td[0].getAttribute('colspan') > 1) {
          return;
        }
        removeNode($td, len);
        $td[0].setAttribute('colspan', value);
        $td[0].innerHTML = '合计';
        $td[0].setAttribute('style', 'text-align: center;');
      }
    }
  }, 200);
};

export default {
  inserted(el, binding) {
    direcFn(el, binding);
  },
  update(el, binding) {
    direcFn(el, binding);
  },
  componentUpdated(el, binding) {
    direcFn(el, binding);
  }
};
