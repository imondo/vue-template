<template>
  <div class="user-layout">
    <div class="container">
      <div class="content">
        <div class="content-left">
          <div class="left-title">
            后台系统
            <!-- <img src="../../assets/login_title.png" alt="" srcset=""> -->
          </div>
          <div class="left-dec">
            测试
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './login'

export default {
  name: 'UserLayout',
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped>
.user-layout {
  height: 100%;
  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(../../assets/bg.png) no-repeat 100%;
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
    .content-left {
      float: left;
      padding-top: 150px;
      font-family: PingFangSC-Medium, PingFang SC;
      color: rgba(255, 255, 255, 1);
      font-weight: 500;
      .left-title {
        font-size: 3.2em;
        line-height: 1.5em;
        letter-spacing: 2px;
        img {
          width: 472px;
          height: 74px;
        }
      }
      .left-dec {
        position: relative;
        height: 30px;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        line-height: 30px;
        &::before,
        &::after {
          content: "";
          display: inline-block;
          width: 74px;
          height: 4px;
          vertical-align: middle;
          background: url(../../assets/left_line.png) center no-repeat;
        }
        &::after {
          background: url(../../assets/right_line.png) center no-repeat;
        }
      }
    }
    .main {
      float: right;
    }
    .footer {
      position: absolute;
      width: 100%;
      bottom: 30px;
      padding: 0 16px;
      text-align: center;
      font-size: 18px;
      color: #fff;
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
