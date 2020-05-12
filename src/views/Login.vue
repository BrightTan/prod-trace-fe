<template>
  <div class="login-page">
    <ScrollBar>
      <div class="page-container">
        <img src="../assets/logo-big.png" alt="Logo" class="logo" />
        <div class="content">
          <div class="title">
            <div></div>
            <div>尊敬的用户，欢迎登陆</div>
            <span>农产品可溯源数据管理系统</span>
          </div>
          <form ref="form" class="form" method="post" action="/login">
            <el-input
              class="mail-input"
              placeholder="请输入邮箱"
              name="username"
              v-model="mail"
              suffix-icon="el-icon-message"
              @keyup.native.enter="onLogin"
            >
            </el-input>
            <el-input
              placeholder="请输入密码"
              v-model="password"
              name="password"
              show-password
              suffix-icon="el-icon-key"
              @keyup.native.enter="onLogin"
            >
            </el-input>
            <div class="option">
              <el-checkbox
                name="rememberMe"
                v-model="rememberMe"
                label="记住我"
              ></el-checkbox>
              <a href="javascript:void()" @click="onForgetPassword"
                >忘记密码？</a
              >
            </div>
            <div class="buttons">
              <el-button type="primary" @click="onLogin">登录</el-button>
              <span>或</span>
              <el-button type="primary" @click="onGogoRegist">注册新账户</el-button>
            </div>
          </form>
        </div>
      </div>
    </ScrollBar>
  </div>
</template>

<script>
import ScrollBar from "@/components/common/ScrollBar.vue";

export default {
  name: "Login",
  components: { ScrollBar },
  data() {
    return {
      mail: "",
      password: "",
      rememberMe: true,
    };
  },
  methods: {
    onForgetPassword() {
      this.$router.push("/ChangePassword");
    },
    onGogoRegist() {
      this.$router.push("/regist");
    },
    onLogin() {
      if (this.mail === "") {
        this.$message.error("邮箱不能为空！");
        return;
      }
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.exec(this.mail)) {
        this.$message.error("请输入正确格式的邮箱！");
        return;
      }
      if (this.password === "") {
        this.$message.error("密码不能为空！");
        return;
      }
      this.$refs.form.submit();
      this.resetData();
    },
    resetData() {
      this.mail = "";
      this.password = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  width: 460px;
  height: 100%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.3);
  .page-container {
    width: 100%;
    box-sizing: border-box;
    padding: 0 50px;
    .logo {
      margin-top: 60px;
    }
    .title {
      color: white;
      position: relative;
      div:nth-child(1) {
        width: 40px;
        height: 5px;
        position: absolute;
        background-color: #1ccdaa;
        top: -4px;
        left: 48px;
      }
      div:nth-child(2) {
        font-size: 26px;
        margin-top: 20px;
        margin-bottom: 5px;
        font-weight: bold;
      }
      span {
        font-size: 12px;
      }
    }
    .form {
      margin-top: 50px;
      .el-input {
        margin-bottom: 10px;
        & /deep/ .el-input__inner {
          background-color: rgba(0, 0, 0, 0.2);
          border: none;
          color: white;
          &:focus {
            background-color: rgba(0, 0, 0, 0.3) !important;
          }
        }
      }
      .option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        .el-checkbox {
          color: white;
          &.is-checked /deep/ .el-checkbox__label {
            color: white;
          }
          & /deep/ .el-checkbox__label {
            color: rgba(255, 255, 255, 0.623);
          }
          & /deep/ .el-checkbox__input {
            &.is-checked {
              .el-checkbox__inner {
                background-color: #fff;
              }
            }
            .el-checkbox__inner {
              background-color: rgba(0, 0, 0, 0.2);
              width: 20px;
              height: 20px;
              border: none;
              &::after {
                border: 3px solid rgb(90, 90, 90);
                width: 4px;
                height: 8px;
                left: 6px;
                top: 3px;
                border-left: 0;
                border-top: 0;
              }
            }
          }
        }
        a {
          &:link,
          &:visited,
          &:focus {
            color: #43a8ff;
          }
          &:hover {
            color: white;
          }
        }
      }
      .buttons {
        margin-top: 20px;
        border-top: 5px dashed rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
        color: white;
        span:nth-child(2) {
          margin: 0 14px;
          font-size: 14px;
        }
        .el-button {
          padding: 6px 12px;
          line-height: 1.42857143;
        }
        button:first-child {
          background-color: #1ccdaa;
          border-color: #1ccdaa;
          color: #f2f2f2;
          &:hover {
            background-color: #14937a;
            border-color: #14937a;
            color: white;
          }
          &:active {
            border-color: white;
          }
        }
        button:last-child {
          background-color: #536781;
          border-color: #536781;
          color: #f2f2f2;
          &:hover {
            background-color: #394759;
            border-color: #394759;
            color: white;
          }
          &:active {
            border-color: white;
          }
        }
      }
    }
  }
}
</style>
