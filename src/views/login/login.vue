<template>
  <div class="main">
    <div class="login-wap">
      <img class="login-bg" src="../../assets/login_bg.png" alt="" srcset="" />
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        status-icon
        class="login-form"
        auto-complete="on"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>

        <el-button
          :disabled="!loginForm.username || !loginForm.password"
          :loading="loading"
          type="primary"
          class="login-button"
          @click.native.prevent="handleLogin"
        >立即登录</el-button>

        <div class="tips">
          <!-- <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span> -->
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
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
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              const redirect = this.getRedirectPath()
              this.$router.push({ name: redirect })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getRedirectPath() {
      const routes = this.$store.getters.permission_routes
      let path = ''
      const getPath = (route) => {
        if (route.children && route.children[0]) {
          getPath(route.children[0])
        } else {
          path = route.name
        }
      }
      getPath(routes[2])
      return path
    }
  }
}
</script>

<style lang="scss">
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
  background: url(../../assets/login_bg.png) no-repeat center;
  margin: 0 auto;
}
.login-form {
  width: 480px;
  box-sizing: border-box;
  padding: 60px 68px 90px 52px;
  background: #fff;
  margin: 0 auto;
  border-radius: 0 0 12px 12px;

  .el-form-item__label {
    color: #333;
    font-size: 16px;
    font-weight: 400;
    line-height: 40px;
  }
  .el-input--small .el-input__inner {
    height: 40px;
    line-height: 40px;
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
    background-color: #408FEB;
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
