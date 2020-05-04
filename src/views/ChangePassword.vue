<template>
  <div class="change-password-page">
    <ScrollBar>
      <div class="page-container">
        <img src="../assets/logo-big.png" alt="Logo" class="logo" />
        <div class="content">
          <div class="auth-mail">
            <div class="title">
              <div></div>
              <div>修改密码</div>
              <span>农产品可溯源数据管理系统</span>
            </div>
            <div class="form">
              <el-input
                class="mail-input"
                placeholder="请输入账号绑定的邮箱"
                v-model="mail"
                suffix-icon="el-icon-message"
                @keyup.native.enter="onConfirm"
              >
              </el-input>
              <el-input
                class="code-input"
                placeholder="请输入验证码"
                v-model="authCode"
                @keyup.native.enter="onConfirm"
              >
                <el-button
                  @click="getVerifyCode"
                  slot="append"
                  icon="el-icon-s-promotion"
                  :disabled="
                    emailButtonText !== '发送邮箱验证码' &&
                      emailButtonText !== '重新发送'
                  "
                  >{{ emailButtonText }}</el-button
                >
              </el-input>
              <el-input
                class="password-input"
                placeholder="请输入新密码"
                type="password"
                v-model="password"
                suffix-icon="el-icon-key"
                @keyup.native.enter="onConfirm"
              >
              </el-input>
              <el-input
                type="password"
                placeholder="请再次输入密码"
                v-model="passwordAgain"
                suffix-icon="el-icon-key"
                @keyup.native.enter="onConfirm"
              >
              </el-input>
              <div class="buttons">
                <el-button type="primary" @click="onConfirm">确认</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollBar>
  </div>
</template>

<script>
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "ChangePassword",
  components: { ScrollBar },
  data() {
    return {
      mail: "",
      authCode: "",
      password: "",
      passwordAgain: "",
      emailButtonText: "发送邮箱验证码"
    };
  },
  methods: {
    onConfirm() {
      if (this.mail === "") {
        this.$message.error("邮箱不能为空！");
        return;
      }
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.exec(this.mail)) {
        this.$message.error("邮箱格式不正确！");
        return;
      }
      if (this.password === "") {
        this.$message.error("密码不能为空！");
        return;
      }
      if (this.passwordAgain === "") {
        this.$message.error("请再次输入新密码！");
        return;
      }
      if (this.password !== this.passwordAgain) {
        this.$message.error("两次输入密码不一致！");
        return;
      }
      if (this.authCode === "") {
        this.$message.error("验证码不能为空！");
        return;
      }
      this.$Http
        .post({
          url: "/user/changePassword",
          data: {
            email: this.mail,
            verificationCode: this.authCode,
            password: this.password
          }
        })
        .then(() => {
          this.$message.success("修改成功");
          this.resetData();
        });
    },
    getVerifyCode() {
      if (this.mail === "") {
        this.$message.error("邮箱不能为空！");
        return;
      }
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.exec(this.mail)) {
        this.$message.error("邮箱格式不正确！");
        return;
      }
      this.emailButtonText = "发送中";
      this.$Http
        .post({
          url: "/user/getVerificationCode",
          data: {
            email: this.mail
          }
        })
        .then(() => {
          this.countDown();
          this.$message.success("成功发送邮件，请注意查收");
        });
    },
    countDown() {
      let count = 5;
      this.emailButtonText = `${count}秒后重新发送`;
      let inter = setInterval(() => {
        count--;
        if (count <= 0) {
          this.emailButtonText = "重新发送";
          clearInterval(inter);
        } else {
          this.emailButtonText = `${count}秒后重新发送`;
        }
      }, 1000);
    },
    resetData() {
      this.mail = "";
      this.authCode = "";
      this.password = "";
      this.passwordAgain = "";
      this.emailButtonText = "发送邮箱验证码";
    }
  }
};
</script>

<style lang="scss" scoped>
.change-password-page {
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
    .auth-mail {
      .title {
        color: white;
        position: relative;
        div:nth-child(1) {
          width: 30px;
          height: 5px;
          position: absolute;
          background-color: #1ccdaa;
          top: -4px;
          left: 126px;
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
          &.code-input {
            & /deep/ .el-input-group__append {
              background-color: rgba(0, 0, 0, 0.2);
              border: none;
            }
            button {
              background-color: #409eff;
              border-color: #409eff;
              color: #f2f2f2;
              &:hover {
                background-color: #1671cc;
                border-color: #1671cc;
                color: white;
              }
              &:active {
                border-color: white;
              }
            }
          }
        }
        .buttons {
          margin-top: 20px;
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
          button {
            width: 100%;
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
        }
      }
    }
  }
}
</style>
