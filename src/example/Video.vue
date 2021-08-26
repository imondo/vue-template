<template>
  <div class="video-list">
    <template v-for="(src, index) in srcs" :key="index">
      <VideoFrame class="video-item" :src="src.url" :poster="src.poster" />
    </template>
  </div>
</template>

<script setup>
import VideoFrame from '@/components/VideoFrame/index.vue';
const srcs = [
  {
    id: 0,
    url: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4',
    poster: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
  },
  {
    id: 1,
    url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    poster: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
  }
];
</script>

<style lang="less" scoped>
.video-list {
  display: flex;
  .video-item {
    width: 318px;
    height: 180px;
    margin-right: 10px;
  }
}
</style>
