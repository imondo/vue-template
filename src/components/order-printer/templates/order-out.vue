<template>
  <el-dialog title="页面打印" :visible.sync="visible" width="780px">
    <OrderPointer :order="order" :list="list" :title="`${userName}出库单`" total-title="本次出库总金额">
      <div slot="header">
        <div class="print-form">
          <div class="print-form-item fl">
            <label class="print-form-item__label">单位代码：</label>
            <span class="print-form-item__content ellipsis-200">{{ order.receiveOrgId }}</span>
          </div>
          <div class="print-form-item fl">
            <label class="print-form-item__label">单位名称：</label>
            <span class="print-form-item__content ellipsis-200">{{ order.receiveOrgName }}</span>
          </div>
          <div class="print-form-item fr">
            <label class="print-form-item__label">日期：</label>
            <span class="print-form-item__content">{{ order.makingDate }}</span>
          </div>
        </div>
        <div class="print-form">
          <div class="print-form-item fl">
            <label class="print-form-item__label">项目名称：</label>
            <span class="print-form-item__content ellipsis-200">{{ order.projectName }}</span>
          </div>
          <div class="print-form-item fl">
            <label class="print-form-item__label">供货单位：</label>
            <span class="print-form-item__content ellipsis-200">{{ order.supplierName }}</span>
          </div>
          <div class="print-form-item fr">
            <label class="print-form-item__label">NO：</label>
            <span class="print-form-item__content">{{ order.code }}</span>
          </div>
        </div>
      </div>
      <div slot="table">
        <el-table :data="list" border max-height="300px">
          <!-- <el-table-column property="code" label="入库单据号" width="80" show-overflow-tooltip></el-table-column> -->
          <el-table-column property="code" label="编号" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column property="name" label="物品名称" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column property="spec" label="规格型号" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column
            property="uom"
            label="单位"
            width="60"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column property="price" label="单价" width="60" align="right"></el-table-column>
          <el-table-column property="quantity" label="数量" width="80" align="right"></el-table-column>
          <el-table-column property="amount" label="金额" width="90" align="right"></el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <div class="footer-item">提货单位章：</div>
        <div class="footer-item">提货人签名：</div>
        <div class="footer-item">单位负责人签名:</div>
        <div class="footer-item">财务专用章：</div>
      </div>
    </OrderPointer>
  </el-dialog>
</template>

<script>
import PrinterMixins from './printer.mixins.js';

export default {
  name: 'PrintOrderOut',
  mixins: [PrinterMixins]
};
</script>

<style lang="scss" scoped>
</style>
