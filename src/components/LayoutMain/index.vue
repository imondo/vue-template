<template>
  <div>
    <LayoutCard class="app-container-top">
      <slot name="query"></slot>
    </LayoutCard>
    <LayoutCard class="app-container-content">
      <div class="btn-groups">
        <slot name="btns"></slot>
      </div>
      <slot name="content"></slot>
    </LayoutCard>
  </div>
</template>

<script>
import LayoutCard from '../LayoutCard/index.vue';
export default {
  name: 'LayoutMain',
  components: {
    LayoutCard
  }
};
</script>

<style lang="less" scoped>
.app-container-content {
  margin-top: 8px;
  .btn-groups {
    margin-bottom: 8px;
    // text-align: right;
  }
}
</style>
