<template>
  <div class="basic-box">
    <Siderbar
      :menu="[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' }
      ]"
    />
    <section class="basic-main">
      <Header />
      <main>
        <router-view />
      </main>
    </section>
  </div>
</template>

<script>
import Header from './Header.vue';
import Siderbar from './Sidebar.vue';
export default {
  name: 'Layouts',
  components: {
    Header,
    Siderbar
  }
};
</script>

<style lang="less" scoped>
.basic-box {
  display: flex;
  .basic-main {
    flex: 1;
  }
}
</style>
