<template lang="html">
  <i v-if="className" :class="className" class="iconfont"/>
</template>

<script>
export default {
  name: 'FontIcon',
  props: {
    className: {
      type: String,
      default: ''
    }
  }
};
</script>
