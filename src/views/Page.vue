<template>
  <div class="about">
    <h1>{{ $route.meta.title }}</h1>
    <router-link :to="{ name: 'ProjectDetail' }">详情</router-link>
  </div>
</template>
