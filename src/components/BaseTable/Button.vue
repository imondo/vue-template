<template>
  <el-button
    v-if="!pop"
    :loading="loading"
    size="mini"
    type="text"
    @click="onClick"
  >
    <slot></slot>
  </el-button>
  <ElPopconfirm
    v-if="pop"
    class="pop-wap"
    confirmButtonText="确定"
    cancelButtonText="取消"
    icon="el-icon-info"
    iconColor="red"
    :title="title"
    @confirm="confirmEvent"
  >
    <template #reference>
      <el-button size="mini" type="text">
        <slot></slot>
      </el-button>
    </template>
  </ElPopconfirm>
</template>

<script setup>
import { ElPopconfirm } from 'element-plus';
import { defineEmit, defineProps } from 'vue';

const props = defineProps({
  loading: Boolean,
  pop: Boolean,
  title: String
});

const emit = defineEmit();

const onClick = () => {
  emit('click');
};

const confirmEvent = () => {
  emit('confirm');
};
</script>

<style lang="less">
.el-popconfirm__action {
  margin-top: 10px;
}
</style>
