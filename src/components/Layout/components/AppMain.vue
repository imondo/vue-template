<template>
  <div class="app-main">
    <Breadcrumb/>
    <transition name="el-fade-in-linear" mode="out-in">
      <router-view :key="key"/>
    </transition>
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb';
export default {
  name: 'AppMain',
  components: { Breadcrumb },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  padding: 10px;
}
</style>
