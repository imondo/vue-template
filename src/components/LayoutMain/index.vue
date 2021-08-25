<template>
  <div>
    <LayoutCard
      v-if="query"
      class="app-container-top"
      :class="{ 'app-container-top-query': query }"
    >
      <slot name="query"></slot>
    </LayoutCard>
    <LayoutCard class="app-container-content">
      <div class="btn-groups">
        <slot name="btns"></slot>
      </div>
      <slot name="content"></slot>
    </LayoutCard>
    <slot></slot>
  </div>
</template>

<script>
import LayoutCard from '../LayoutCard/index.vue';
export default {
  name: 'LayoutMain',
  components: {
    LayoutCard
  },
  props: {
    query: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less" scoped>
.app-container-top-query {
  /deep/ .el-card__body {
    padding-bottom: 0;
  }
}
.app-container-content {
  margin-top: 8px;
  .btn-groups {
    margin-bottom: 16px;
  }
}
</style>
