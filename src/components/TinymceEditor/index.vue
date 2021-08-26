<template>
  <div class="tinymce-wrapper">
    <div :id="tinymceId"></div>
  </div>
</template>

<script setup>
import loadScript from '@/utils/load-script.js';
import config from './config';
import {
  defineProps,
  defineEmit,
  nextTick,
  onMounted,
  onUnmounted,
  ref
} from 'vue';

const props = defineProps({
  content: {
    type: [String, Number, Array, Object],
    default: ''
  },
  tinymceId: {
    type: String,
    default: 'tinymceId'
  },
  height: {
    type: [Number, String],
    default: 500
  },
  width: {
    type: [Number, String],
    default: 'auto'
  }
});

const emit = defineEmit();

onMounted(() => {
  loadScript(config.script).then(() => {
    const selector = `#${props.tinymceId}`;
    window.tinymce.init({
      selector,
      language: 'zh_CN',
      height: props.height,
      plugins: config.plugins,
      toolbar: config.toolbar,
      images_upload_url: '/demo/upimg.php',
      images_upload_base_path: '/demo',
      init_instance_callback: editor => {
        if (props.content) {
          editor.setContent(props.content);
        }
        editor.on('NodeChange Change KeyUp SetContent', () => {
          emit('update:content', editor.getContent());
        });
      }
    });
  });
});

onUnmounted(() => {
  const tinymce = window.tinymce.get(props.tinymceId);
  if (tinymce) {
    tinymce.destroy();
  }
});
</script>

<style lang="less" scoped></style>
