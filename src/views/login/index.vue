<template>
  <div class="user-layout">
    <div class="container">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm
  }
};
</script>

<style lang="less" scoped>
.user-layout {
  height: 100%;
  background-color: #f8f8f9;
  .container {
    width: 100%;
    min-height: 100%;
    // background: #f0f2f5 url(../../assets/bg.png) no-repeat 100%;
    background-size: cover;
    padding: 150px 0 144px;
    position: relative;
    a {
      text-decoration: none;
    }
    .content {
      max-width: 1440px;
      margin: 0 auto;
      overflow: hidden;
      padding: 0 3% 0 6.67%;
    }
  }
}
@media screen and (max-width: 1270px) {
  .user-layout {
    .container {
      .content {
        overflow: hidden;
        padding: 0 3% 0 4%;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .user-layout {
    .container {
      padding-top: 90px;
      .content-left {
        float: inherit;
        padding-top: 0;
        margin-bottom: 30px;
        text-align: center;
      }
      .main {
        float: inherit;
      }
    }
  }
}
</style>
