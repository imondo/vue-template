<template>
  <div class="login">
    <el-form :mode="form" class="login-form" size="normal">
      <h3 class="title">登录</h3>
      <el-form-item>
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="请输入用户密码"></el-input>
      </el-form-item>
      <el-button type="primary" class="form-btn" @click="handleClick">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'test',
        password: 'test'
      }
    };
  },
  methods: {
    handleClick() {
      localStorage.setItem('user', JSON.stringify(this.form));
      localStorage.setItem('access_token', '1');
      setTimeout(() => {
        this.$router.push({ name: 'Page' });
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background: url("/images/bg.jpg") no-repeat 100%;
  background-size: cover;
}
.title {
  margin: 15px 0;
  text-align: center;
}
.login-form {
  width: 450px;
  box-sizing: border-box;
  padding: 30px 70px 87px 70px;
  background: #fff;
  margin: 0 auto;
  .form-btn {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
    background: #098cc8;
    -webkit-box-shadow: 0px 6px 8px 0px rgba(42, 83, 236, 0.38);
    box-shadow: 0px 6px 8px 0px rgba(42, 83, 236, 0.38);
    border-radius: 4px;
  }

  .title {
    font-size: 2em;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    text-align: center;
    color: #098cc8;
    line-height: 65px;
    letter-spacing: 1px;
  }
}
</style>
