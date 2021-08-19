<template>
  <div class="main">
    <div class="login-wap">
      <img class="login-bg" src="../../assets/login_bg.png" alt="" srcset="" />
      <el-form
        ref="loginForm"
        :model="state.form"
        :rules="state.rules"
        status-icon
        class="login-form"
        auto-complete="on"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input
            ref="username"
            v-model="state.form.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            :key="state.passwordType"
            ref="password"
            v-model="state.form.password"
            :type="state.passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-button
          :loading="state.loading"
          type="primary"
          class="login-button"
          @click.prevent="handleLogin"
          >立即登录</el-button
        >

        <div class="tips"></div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const loginForm = ref(null);

const validateUsername = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入用户名'));
  } else {
    callback();
  }
};
const validatePassword = (rule, value, callback) => {
  if (!value.length) {
    callback(new Error('请输入密码'));
  } else {
    callback();
  }
};
const state = reactive({
  form: {
    username: 'admin',
    password: '123456'
  },
  rules: {
    username: [
      { required: false, trigger: 'blur', validator: validateUsername }
    ],
    password: [
      { required: false, trigger: 'blur', validator: validatePassword }
    ]
  },
  loading: false,
  passwordType: 'password',
  redirect: undefined
});
const showPwd = () => {
  if (state.passwordType === 'password') {
    state.passwordType = '';
  } else {
    state.passwordType = 'password';
  }
  this.$nextTick(() => {
    this.$refs.password.focus();
  });
};

const handleLogin = () => {
  loginForm.value.validate(valid => {
    if (valid) {
      state.loading = true;
      store
        .dispatch('user/Login', state.form)
        .then(() => {
          router.push({ path: '/' });
          state.loading = false;
        })
        .catch(() => {
          state.loading = false;
        });
    } else {
      return false;
    }
  });
};
</script>

<style lang="less">
.login-wap {
  width: 480px;
  margin: 0 auto;
  font-size: 0; // 去除块级缝
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.18);
}
.login-bg {
  width: 480px;
  height: 128px;
  // background: url(../../assets/login_bg.png) no-repeat center;
  margin: 0 auto;
}
.login-form {
  width: 480px;
  box-sizing: border-box;
  padding: 60px 68px 90px 52px;
  background: #fff;
  margin: 0 auto;

  .el-form-item__label {
    color: #333;
    font-size: 14px;
    font-weight: 400;
    line-height: 36px;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 30px;
  }
  .login-button {
    margin-left: 18px;
    margin-top: 30px;
    width: 344px;
    height: 40px;
    font-size: 14px;
    background-color: #408feb;
    border-radius: 4px;
    border-color: transparent;
    &[disabled] {
      background: #e8eef4;
    }
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
}
</style>
