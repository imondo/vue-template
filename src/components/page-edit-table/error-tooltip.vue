<template>
  <div class>
    <el-tooltip
      :content="content"
      :disabled="!content"
      :value="!!content && hovering"
      placement="top-start"
      effect="light"
      manual
      popper-class="edit-table-tooltip-error"
    >
      <slot></slot>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ErrorTooltip',
  props: {
    content: {
      type: String,
      default: ''
    },
    hovering: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.edit-table-tooltip-error {
  &.is-light {
    border: 1px solid #c0c4cc;
    color: #f56c6c;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  &.is-light[x-placement^='top'] .popper__arrow {
    border-top-color: #c0c4cc;
  }
}
</style>
