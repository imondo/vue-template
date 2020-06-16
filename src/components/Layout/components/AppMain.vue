<template>
  <div class="app-main">
    <Breadcrumb class="breadcrumb-wap"/>
    <div class="app-main-content">
      <transition name="el-fade-in-linear" mode="out-in">
        <router-view :key="key"/>
      </transition>
    </div>
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
  padding-bottom: 10px;
}
.breadcrumb-wap {
  padding: 16px 20px;
  background: #fff;
}
.app-main-content {
  margin: 20px;
  padding: 20px;
  background: #fff;
}
</style>
