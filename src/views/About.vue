<template>
  <div class="about">
    <h1>{{ $route.meta.title }}</h1>
    <router-link :to="{ name: 'ProjectDetail', query: { id: 1 } }">
      详情
    </router-link>
  </div>
</template>
<script>
export default {
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData(to, from) {
      console.log(to, from);
    }
  }
};
</script>
