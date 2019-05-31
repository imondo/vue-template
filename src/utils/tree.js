/**
 * 扁平数据转换成树形结构
 * @param {Array} treeArray 扁平数据
 */
export async function getTree(
  treeArray,
  cond = false,
  rootKey = { id: 'id', parent: 'parentId' }
) {
  const r = [];
  const tmpMap = {};
  const { id: key, parent: parentKey } = rootKey;
  for (const val of treeArray) {
    val[key] && (tmpMap[val[key]] = val);
  }
  for (const val of treeArray) {
    const key = tmpMap[val[parentKey]];
    if (key) {
      if (!key['children']) {
        key['children'] = [];
        key['children'].push(val);
      } else {
        if (cond) {
          if (key['children'].some(v => v[key] !== val[key])) {
            key['children'].push(val);
          }
        } else {
          key['children'].push(val);
        }
      }
    } else {
      r.push(val);
    }
  }
  return r;
}

/**
 * 扁平化树结构数据
 * @param {Array} tree 树结构数据
 */
export function treeToList(tree, key = 'children') {
  let queen = [];
  const out = [];
  queen = queen.concat(tree);
  while (queen.length) {
    const first = queen.shift();
    if (first[key]) {
      queen = queen.concat(first[key]);
      delete first[key];
    }

    out.push(first);
  }
  return out;
}

export function sortMenu(data) {
  if (!data.length) return;
  data.forEach(function(menu) {
    if (menu.children) {
      menu.children.sort(function(a, b) {
        return a.sort - b.sort;
      });
      sortMenu(menu.children);
    } else {
      return;
    }
  });
}
