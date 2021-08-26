<template>
  <div class="video-warpper">
    <ElSkeleton :loading="loading" animated style="width: 100%; height: 100%">
      <template #template>
        <ElSkeletonItem variant="rect" style="width: 100%; height: 100%" />
      </template>
      <template #default>
        <video
          ref="player"
          class="video-js vjs-default-skin"
          style="width: 100%; height: 100%; object-fit: fill"
        ></video>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup>
import config from './config';
import loadScript, { createStyles } from '@/utils/load-script.js';
import { ref, defineProps, onMounted, onUnmounted } from 'vue';
import { ElSkeleton, ElSkeletonItem } from 'element-plus';

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    default: ''
  }
});

const videoPlayer = ref(null);
const player = ref(null);
const loading = ref(true);

onMounted(() => {
  createStyles(config.link);
  loadScript(config.script).then(() => {
    loading.value = false;
    setTimeout(() => {
      videoPlayer.value = window.videojs(player.value, config.options);
      videoPlayer.value.src([
        {
          src: props.src,
          poster: props.poster
        }
      ]);
    }, 500);
  });
});

onUnmounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.dispose();
  }
});
</script>

<style lang="less" scoped>
.video-warpper {
  width: 100%;
  height: 100%;
  /deep/ .video-js .vjs-big-play-button {
    top: 50%;
    left: 50%;
    margin-left: -1.5em;
    margin-top: -0.8em;
  }
}
</style>
