<template>
  <el-form :inline="true" :model="model" class="query-form">
    <el-row :gutter="24">
      <slot></slot>
      <template v-if="visable">
        <slot name="more"></slot>
      </template>
      <el-col style="text-align: right" :xs="24" :sm="24" :md="6">
        <el-button type="primary" @click="onClickQuery">查询</el-button>
        <el-button @click="onClickReset">重置</el-button>
        <a class="advanced" @click="toggleAdvanced" style=""
          >{{ visable ? '收起' : '展开' }}
          <i class="fas" :class="visable ? 'fa-angle-up' : 'fa-angle-down'" />
        </a>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'QueryForm',
  props: {
    model: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const visable = ref(false);
    const onClickQuery = () => {
      emit('query');
    };
    const onClickReset = () => {
      emit('reset');
    };
    const toggleAdvanced = () => {
      visable.value = !visable.value;
    };
    return {
      visable,
      onClickQuery,
      onClickReset,
      toggleAdvanced
    };
  }
};
</script>

<style lang="less" scoped>
.advanced {
  margin-left: 8px;
  font-size: 14px;
  color: #2d8cf0;
  background: transparent;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  transition: color 0.2s ease;
}
</style>
