<template>
  <div class="ly-print-wrapper">
    <div class="print-btn">
      <el-button type="primary" @click="handlePrintA4">A4打印</el-button>
      <el-button type="primary" @click="handlePrint">直接打印</el-button>
    </div>
    <div ref="print" class="ly-print-content">
      <div ref="printHead">
        <h3 class="print-title">{{ title }}</h3>
        <div class="print-chapter">
          <div class="chapter">调拨专用章</div>
        </div>
        <div class="print-header">
          <!-- 单据表头 -->
          <slot name="header"></slot>
        </div>
      </div>
      <!-- 表格 -->
      <div ref="printTable" class="print-table">
        <slot name="table"></slot>
      </div>
      <!-- 金额大写 -->
      <div ref="printFooterAmount" class="footer-amount">
        <div class="footer-amount-item current-amount">
          <div class="amount--upper fl">
            <span class="label">本页合计金额(大写)：</span>
            <span class="current-amount--upper">{{ upperAmount }}</span>
          </div>
          <div class="amount--lower fr">
            <span class="label">小写：</span>
            ￥<span class="current-amount--lower">{{ lowerAmount }}</span>
          </div>
        </div>
        <div class="footer-amount-item total-amount">
          <div class="amount--upper fl">
            <span class="label">{{ totalTitle }}(大写)：</span>
            <span class="total-amount--upper">{{ upperAmount }}</span>
          </div>
          <div class="amount--lower fr">
            <span class="label">小写：</span>
            ￥<span class="total-amount--lower">{{ lowerAmount }}</span>
          </div>
        </div>
      </div>
      <div ref="printFooter" class="print-footer">
        <!-- 单据底部 -->
        <slot name="footer"></slot>
        <div class="number-pages">
          共 <span class="pages">{{ pages }}</span> 页/第
          <span class="count-page">{{ count }}</span>页
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Print from './print.js';

export default {
  name: 'OrderPointer',
  props: {
    title: {
      type: String,
      default: ''
    },
    totalTitle: {
      type: String,
      default: ''
    },
    order: {
      required: true,
      type: Object,
      default: () => ({})
    },
    list: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      count: 1, // 当前页数
      pages: 1 // 总共页数
    };
  },
  computed: {
    upperAmount() {
      return this.digitUppercase(this.order.amount);
    },
    lowerAmount() {
      return this.currency(this.order.amount);
    }
  },
  methods: {
    /**
     * A4打印 纵向打印
     * 直接打印为A5 横向打印
     */
    handlePrintA4() {
      const print = this.pagesContent({ num: 30 });
      new Print(print, {
        size: {
          paper: 'A4',
          direction: 'portrait'
        }
      });
    },
    handlePrint() {
      const print = this.pagesContent({});
      new Print(print, {
        size: {
          paper: 'A5',
          direction: 'landscape'
        }
      });
    },
    /**
     * 打印内容分页显示组合
     * @param { Number } num 表格显示条数
     * @param { Number } totalSite 金额表格列位置
     */
    pagesContent({ num = 10, totalSite = 6 }) {
      // 当前分页总数
      const pages = this.getPages(num);
      const printIframe = document.createElement('div');
      const table = this.getPrintTable(); // 获取表格
      const tr = table.querySelectorAll('tbody tr');
      const trArr = [...tr];
      let i = 0;
      while (i < pages) {
        i++;
        const printContent = this.printContentAll();
        const tbody = printContent.querySelector('tbody');
        const pagesDom = printContent.querySelector('.pages');
        const countPageDom = printContent.querySelector('.count-page');
        pagesDom.innerText = pages; // 总共页码
        countPageDom.innerText = i; // 当前页码
        tbody.innerHTML = '';
        const trs = trArr.splice(0, num); // 表格数据分页
        // 循环插入每页表格列
        trs.forEach(t => {
          tbody.appendChild(t);
        });
        const totalAmount = printContent.querySelector('.total-amount'); // 总金额
        // 最后一页才显示总计金额
        if (i <= pages - 1) {
          totalAmount.setAttribute('style', 'display: none');
        }

        // 当前页金额
        const currAmount = this.currentPageAmount(trs, totalSite);
        const currUpperAmount = printContent.querySelector('.current-amount--upper'); // 当前页大写金额合计
        const currLowerAmount = printContent.querySelector('.current-amount--lower'); // 当前页小写金额合计
        currUpperAmount.innerText = currAmount.upper;
        currLowerAmount.innerText = currAmount.lower;

        printIframe.appendChild(printContent); // 插入每页内容
      }
      return printIframe;
    },
    // 当前页金额
    currentPageAmount(trs, totalSite) {
      let amount = 0;
      trs.forEach(tr => {
        const tds = tr.querySelectorAll('td');
        const tdAmount = tds[totalSite].querySelector('.cell').innerText; // 当前行金额
        amount += +tdAmount;
      });
      const upper = this.digitUppercase(amount);
      const lower = this.currency(amount);
      return { upper, lower };
    },
    /**
     * 打印内容整体显示
     */
    printContentAll() {
      const printIframe = document.createElement('div');
      printIframe.setAttribute('class', 'ly-print-content print-wrapper');
      const head = this.getPrintHead();
      const footer = this.getPrintFooter();
      const table = this.getPrintTable();
      const tableBottom = this.getPrintFooterAmount();
      printIframe.appendChild(head);
      printIframe.appendChild(table);
      printIframe.appendChild(tableBottom);
      printIframe.appendChild(footer);
      return printIframe;
    },
    /**
     * 获取分页总数
     */
    getPages(num) {
      const pages = Math.ceil(this.list.length / num);
      return pages;
    },
    // 打印表头
    getPrintHead() {
      const head = this.$refs.printHead;
      return head.cloneNode(true);
    },
    // 打印底部
    getPrintFooter() {
      const footer = this.$refs.printFooter;
      return footer.cloneNode(true);
    },
    // 打印页面金额合计
    getPrintFooterAmount() {
      const footerAmount = this.$refs.printFooterAmount;
      return footerAmount.cloneNode(true);
    },
    /**
     * 将两个表格合成一个表格
     * 防止表头和表体错位
     */
    getPrintTable() {
      const print = this.$refs.printTable;
      // 新建一个 DOM
      const table = print.cloneNode(true);

      // 提取第一个表格的内容 即表头
      const ths = table.querySelectorAll('.el-table__header-wrapper th');
      const ThsTextArry = [];
      for (let i = 0, len = ths.length; i < len; i++) {
        if (ths[i].innerText !== '') ThsTextArry.push(ths[i].innerText);
      }

      // 删除多余的表头
      table.querySelector('.hidden-columns').remove();
      // 第一个表格的内容提取出来后已经没用了 删掉
      table.querySelector('.el-table__header-wrapper').remove();

      // 将第一个表格的内容插入到第二个表格
      let newHTML = '<tr>';
      for (let i = 0, len = ThsTextArry.length; i < len; i++) {
        newHTML +=
          '<td style="text-align: center; font-weight: bold">' +
          ThsTextArry[i] +
          '</td>';
      }

      newHTML += '</tr>';
      table
        .querySelector('.el-table__body-wrapper table')
        .insertAdjacentHTML('afterbegin', `<thead>${newHTML}</thead>`);
      // 去掉表格滚动高度
      table.querySelector('.el-table').setAttribute('style', 'height: auto;');
      table
        .querySelector('.el-table__body-wrapper')
        .setAttribute('style', 'height: auto;');
      return table;
    },
    // 金额大写
    digitUppercase(n) {
      const fraction = ['角', '分'];
      const digit = [
        '零',
        '壹',
        '贰',
        '叁',
        '肆',
        '伍',
        '陆',
        '柒',
        '捌',
        '玖'
      ];
      const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
      const head = n < 0 ? '欠' : '';
      n = Math.abs(n);
      let s = '';
      for (var i = 0; i < fraction.length; i++) {
        s += (
          digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/零./, '');
      }
      s = s || '整';
      n = Math.floor(n);
      for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
      }
      return (
        head +
        s
          .replace(/(零.)*零元/, '元')
          .replace(/(零.)+/g, '零')
          .replace(/^整$/, '零元整')
      );
    },
    // 金额阶段写法 000,000,000
    currency(value, currency = '', decimals = 2) {
      value = parseFloat(value);
      if (!isFinite(value) || (!value && value !== 0)) return '';
      const stringified = Math.abs(value).toFixed(decimals);
      const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
      const i = _int.length % 3;
      const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
      const _float = decimals ? stringified.slice(-1 - decimals) : '';
      const sign = value < 0 ? '-' : '';
      return (
        sign +
        currency +
        head +
        _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,') +
        _float
      );
    }
  }
};
</script>

<style lang="scss">
.ly-print-wrapper {
  .print-btn {
    text-align: right;
  }
}
@import './print.scss';

// 打印样式设置
@media print {
  /**打印页面边距设置 */
  @page {
    margin: 0cm;
  }
  body {
    margin: 0cm;
    background-color: #fff;
  }
  .print-wrapper {
    margin: 0 auto;
    padding: 2cm 2cm;
  }
  table,
  tbody,
  thead {
    width: 100% !important;
  }
  .el-table thead td {
    text-align: center;
    line-height: 30px;
  }
  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
  }
  .el-table--border::after,
  .el-table--group::after {
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
  }
}
</style>
