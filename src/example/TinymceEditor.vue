<template>
  <LayoutMain :query="false">
    <template #content>
      <TinymceEditor v-model:content="content" height="80vh" />
      <el-button type="primary" @click="onClick">提交</el-button>
    </template>
  </LayoutMain>
</template>

<script setup>
import TinymceEditor from '@/components/TinymceEditor/index.vue';
import { ref } from 'vue';

const content = ref(`<h1 style="text-align: center;">测试demo!</h1>
  <p>嗨</p>
  <img class="img" src="https://ali-image-test.dabanjia.com/image/20200508/1588911589606_5140%24ban.jpg" width="200"/>
  <p>枕着幸福在梦中微笑，清零生活的压力烦恼，阳光透过窗与你拥抱，伸伸懒腰迎接周末来到，问候源于无法按捺的心跳，愿你周末乐逍遥，生活更美妙！
      周末来到，让烦恼跑光，让忧愁找不到，跟寂寞说再见，跟压力说拜拜，跟快乐说你好，牵着幸福的手，携上平安，开开心心的过周末！
      每个人，都有一个世界；每首歌，都有一个故事；每一周，都有一个周末；每个人，都要一个愿望；我的愿望很现实：周末清晨，搅黄你的美梦！周末快乐！
  </p>
  `);
const onClick = () => {
  console.log(content);
};
</script>

<style lang="less" scoped></style>
