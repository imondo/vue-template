<template>
  <div class="login">
    <el-form :mode="form" class="login-form">
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
      this.$router.push({ name: 'Page' });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  margin: 15px 0;
  text-align: center;
}
.login-form {
  width: 450px;
  margin-top: 180px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  .form-btn {
    width: 100%;
  }
}
</style>
