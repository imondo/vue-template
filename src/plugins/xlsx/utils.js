/* eslint-disable no-undef */
export function parseConfig(config, $merges, $output, $cols) {
  if (config.merges) {
    config.merges.forEach(item => {
      const m = XLSX.utils.decode_range(item);
      $merges.push(m);
    });
  }
  if (config.style) {
    Object.keys(config.style).forEach(key => {
      if ($output[key]) {
        $output[key].s = { ...$output[key].s, ...config.style[key] };
      }
      if (Object.keys($output).some(k => k.includes(key))) {
        Object.keys($output).forEach(k => {
          if (k.includes(key)) {
            $output[k].s = { ...$output[k].s, ...config.style[key] };
          }
        });
      }
    });
  }
  if (config.cols) {
    Object.keys(config.cols).forEach(key => {
      const index = XLSX.utils.decode_col(key);
      $cols[index] = config.cols[key];
    });
  }
}
export function setTableThead(wb) {
  for (let key in wb) {
    let i = wb[key].v.indexOf('<key>');
    if (i > -1) {
      const _v = wb[key].v.substr(0, i);
      wb[key].v = _v;
    }
  }
  return wb;
}

// 设置合并表头
export function setTableMerges(header, wb, hasTitle) {
  let _merges = [];
  let len = header.length - 1;
  if (hasTitle) {
    let o = {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: len,
        r: 0
      }
    };
    _merges.push(o);
  }
  return [..._merges];
}

// 设置表头
export function setMergeThead(wb, hasTitle, fileName) {
  const borderAll = {
    top: {
      style: 'medium'
    },
    bottom: {
      style: 'medium'
    },
    left: {
      style: 'medium'
    },
    right: {
      style: 'medium'
    }
  };
  if (hasTitle) {
    wb['A1'] = {
      v: `${fileName}`,
      s: {
        border: borderAll,
        font: {
          sz: 20,
          bold: true,
          color: { rgb: 'FFFFFF' }
        },
        alignment: {
          horizontal: 'center'
        },
        fill: {
          fgColor: { rgb: 'eeeeee' }
        }
      }
    };
  }
  return wb;
}

export function setBorderStyle() {
  const borderAll = {
    top: {
      style: 'medium'
    },
    bottom: {
      style: 'medium'
    },
    left: {
      style: 'medium'
    },
    right: {
      style: 'medium'
    }
  };
  return { border: borderAll };
}

export function save(wb, fileName) {
  let wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  };
  let xw = XLSX.write(wb, wopts);
  let obj = new Blob([s2ab(xw)], {
    type: ''
  });
  let elem = document.createElement('a');
  elem.download = fileName || '下载';
  elem.href = URL.createObjectURL(obj);
  elem.click();
  setTimeout(function () {
    URL.revokeObjectURL(obj);
  }, 100);
}

// 对象路径获取值
export function getValueByPath(obj, path) {
  if (!path) {
    return;
  }
  let targets = path.split('.');
  let curObj = obj;
  for (let i = 0; i < targets.length; i++) {
    if (!curObj) {
      break;
    }
    curObj = curObj[targets[i]];
  }
  return curObj;
}

function s2ab(s) {
  if (typeof ArrayBuffer !== 'undefined') {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  } else {
    const buf = new Array(s.length);
    for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
}

// 根据val查询Object key
function findKey(val, obj) {
  return Object.keys(obj).find(v => obj[v] === val);
}
