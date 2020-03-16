// 由一个组件，向下找到最近的指定组件
export function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}

export function debounce(fn, delay = 1500) {
  let time = null;
  return function() {
    clearTimeout(time);
    time = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
