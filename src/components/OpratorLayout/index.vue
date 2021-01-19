<template>
  <div class="oprator_layout">
    <span>{{ label }}</span>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.oprator_layout {
  float: left;
  margin-left: 30px;
  &:first-child {
    margin-left: 0;
  }
}
</style>
