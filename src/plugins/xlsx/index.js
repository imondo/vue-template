import {
  parseConfig,
  setBorderStyle,
  setMergeThead,
  setTableMerges,
  setTableThead,
  getValueByPath,
  save
} from './utils';
import loadScript from '@/utils/load-script.js';
/**
 * @param {Array} header 表格头部
 * @param {Array} body 表格数据
 * @param {String} fileName 导出名称
 * @param {Boolean} hasTitle 是否需要标题
 */

/**
 *  const header = [
      { name: '大大' },
      { age: '大地方' },
      { sex: '传参' },
      { work: '写法' },
      { edu: '撒大' }
    ];
    const data = [
      { name: '大大', age: '18', sex: '的', work: 2, edu: '吧' },
      { name: '得代峰', age: '23', sex: '生成', work: 5, edu: '和' },
      { name: '发我', age: '34', sex: '是', work: 2, edu: '发错' }
    ]
 */
class ExportXlsx {
  constructor() {
    loadScript('/xlsx/xlsx.core.min.js');
  }

  export({
    header = [],
    body = [],
    fileName = 'xlsx',
    hasTitle = true,
    config = {}
  }) {
    const styleCell = setBorderStyle();

    const _headers = header
      .map((v, i) => {
        let key = Object.keys(v);
        return Object.assign(
          {},
          {
            v: `${v[key[0]]}<key>${key[0]}`,
            position: String.fromCharCode(65 + i) + (hasTitle ? 2 : 1)
          }
        );
      })
      .reduce(
        (prev, next) =>
          Object.assign({}, prev, {
            [next.position]: { v: next.v, s: styleCell }
          }),
        {}
      );
    console.log(_headers);
    const _body = body
      .map((v, i) =>
        header.map((k, j) => {
          let key = Object.keys(k);
          // key 值取为对象.数据 key.key.key
          let _v = getValueByPath(v, key[0]);
          return Object.assign(
            {},
            {
              v: _v,
              position: String.fromCharCode(65 + j) + (i + (hasTitle ? 3 : 2))
            }
          );
        })
      )
      .reduce((prev, next) => prev.concat(next))
      .reduce((prev, next) => {
        const o = { v: next.v, s: styleCell };
        o.t = isNaN(+next.v) ? 's' : 'n';
        return Object.assign({}, prev, {
          [next.position]: o
        });
      }, {});

    const mergeThead = setMergeThead(_headers, hasTitle, fileName);

    const _merges = setTableMerges(header, _headers, hasTitle);

    const _thead = setTableThead(mergeThead);

    const output = Object.assign({}, _thead, _body);

    const outputPos = Object.keys(output);

    const ref =
      (hasTitle ? 'A1' : outputPos[0]) + ':' + outputPos[outputPos.length - 1];

    // 列宽
    const _cols = [];

    // 配置
    parseConfig(config, _merges, output, _cols);

    const wb = {
      SheetNames: ['mySheet'],
      Sheets: {
        mySheet: Object.assign({}, output, {
          '!ref': ref,
          '!merges': _merges,
          '!cols': _cols
        })
      }
    };
    console.log(wb);
    save(wb, `${fileName}.xlsx`);
  }
}

export default ExportXlsx;
