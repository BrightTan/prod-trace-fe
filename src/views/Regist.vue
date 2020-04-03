<template>
  <div class="regist-page">
    <ScrollBar>
      <div class="page-container">
        <img src="../assets/logo-big.png" alt="Logo" class="logo" />
        <div class="content">
          <div class="title">
            <div></div>
            <div>注册新账户</div>
            <span>农产品可溯源数据管理系统</span>
          </div>
          <div class="form">
            <el-radio-group v-model="registInfo.companyClass">
              <el-radio-button size="medium" label="生产公司"
                >生产公司</el-radio-button
              >
              <el-radio-button size="medium" label="加工公司"
                >加工公司</el-radio-button
              >
              <el-radio-button size="medium" label="运输公司"
                >运输公司</el-radio-button
              >
              <el-radio-button size="medium" label="销售公司"
                >销售公司</el-radio-button
              >
            </el-radio-group>
            <el-input
              class="account-input"
              placeholder="请输入用户名"
              v-model="registInfo.account"
              suffix-icon="el-icon-s-custom"
            >
            </el-input>
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="registInfo.password"
              suffix-icon="el-icon-key"
            >
            </el-input>
            <el-input
              type="password"
              placeholder="请再次输入密码"
              v-model="registInfo.passwordAgain"
              suffix-icon="el-icon-key"
            >
            </el-input>
            <el-input
              placeholder="请输入手机号码"
              v-model="registInfo.phone"
              suffix-icon="el-icon-phone"
            >
            </el-input>
            <el-input
              placeholder="请输入注册邮箱"
              v-model="registInfo.email"
              suffix-icon="el-icon-message"
            >
            </el-input>
            <el-input
              class="code-input"
              placeholder="请输入验证码"
              v-model="registInfo.authCode"
            >
              <el-button slot="append" icon="el-icon-s-promotion"
                >发送邮箱验证码</el-button
              >
            </el-input>
            <div class="buttons">
              <el-button type="primary">注册</el-button>
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
  name: "Regist",
  components: { ScrollBar },
  data() {
    return {
      registInfo: {
        account: "",
        password: "",
        passwordAgain: "",
        phone: "",
        wechat: "",
        email: "",
        authCode: "",
        companyClass: ""
      }
    };
  },
  methods: {
    onForgetPassword() {
      this.$router.push("/ChangePassword/auth");
    },
    onChangeCompanyClass(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.regist-page {
  width: 500px;
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
        left: 134px;
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
      .el-radio-group {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        .el-radio-button.is-active {
          & /deep/ .el-radio-button__inner {
            background-color: #1ccdaa;
            color: white;
            border: 1px solid #1ccdaa;
          }
        }
        & /deep/ .el-radio-button__inner {
          background-color: rgba(255, 255, 255, 0.2);
          color: rgb(201, 201, 201);
          border: 1px solid rgba(0, 0, 0, 0.3);
        }
      }
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
</style>
