<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h1>{{ $route.meta.title }}</h1>
    <table>
      <tr>
        <th>-</th>
        <th>小学</th>
        <th>初中</th>
        <th>高中</th>
        <th>-</th>
        <th>现有数量</th>
        <th>生均册数</th>
        <th>-</th>
        <th>现有数量</th>
        <th>生均册数</th>
        <th>--</th>
        <th>--</th>
      </tr>
      <tr>
        <th>学生人数</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>纸质图书</th>
        <th></th>
        <th></th>
        <th>电子图书</th>
        <th>0</th>
        <th>0</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>装备人员</th>
        <th>总数</th>
        <th>专职</th>
        <th>兼职</th>
        <th>高级</th>
        <th>中级</th>
        <th>初级</th>
        <th>其他</th>
        <th>本科及以上</th>
        <th>专科</th>
        <th>高中</th>
        <th>初级及以下</th>
      </tr>
      <tr>
        <th>实验管理员</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
      </tr>
      <tr>
        <th>图书管理员</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
      </tr>
      <tr>
        <th>装备用房</th>
        <th colspan="2">科学实验室/探究室</th>
        <th colspan="2">物理实验室/探究室</th>
        <th colspan="2">化学实验室/探究室</th>
        <th colspan="2">生物实验室/探究室</th>
        <th colspan="3">--</th>
      </tr>
      <tr>
        <th>数量(间)</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="3">--</th>
      </tr>
      <tr>
        <th>面积(m2)</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="3">--</th>
      </tr>
      <tr>
        <th>装备用房</th>
        <th colspan="2">理科实验员室</th>
        <th colspan="2">理科仪器室</th>
        <th colspan="2">理科准备室</th>
        <th colspan="2">药品/标本室</th>
        <th colspan="2">计算机教室</th>
        <th>图书馆/室</th>
      </tr>
      <tr>
        <th>数量(间)</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th>0</th>
      </tr>
      <tr>
        <th>面积(m2)</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th>0</th>
      </tr>
      <tr>
        <th>装备用房</th>
        <th colspan="2">音乐专用教室</th>
        <th colspan="2">美术专用教室</th>
        <th colspan="2">体育器材室</th>
        <th colspan="2">心理咨询室</th>
        <th colspan="2">卫生保健室</th>
        <th>文科专用教室</th>
      </tr>
      <tr>
        <th>数量(间)</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th>0</th>
      </tr>
      <tr>
        <th>面积(m2)</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th colspan="2">0</th>
        <th>0</th>
      </tr>
      <tr>
        <th>装备资产</th>
        <th>科学</th>
        <th>物理</th>
        <th>化学</th>
        <th>生物</th>
        <th>数学</th>
        <th>地理</th>
        <th>音乐</th>
        <th>美术</th>
        <th>体育</th>
        <th>卫生</th>
        <th>文科</th>
      </tr>
      <tr>
        <th>现有件数</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
      </tr>
      <tr>
        <th>现有金额</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
      </tr>
      <tr>
        <th>尚缺金额</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
      </tr>
      <tr>
        <th>品种配备率</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
      </tr>
      <tr>
        <th>件数配备率</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
        <th>0</th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>
