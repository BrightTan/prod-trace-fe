<template>
  <div class="auth-mail">
    <div class="title">
      <div></div>
      <div>验证邮箱</div>
      <span>农产品可溯源数据管理系统</span>
    </div>
    <div class="form">
      <el-input
        class="mail-input"
        placeholder="请输入账号绑定的邮箱"
        v-model="mail"
        suffix-icon="el-icon-message"
      >
      </el-input>
      <el-input
        class="code-input"
        placeholder="请输入验证码"
        v-model="authCode"
      >
        <el-button slot="append" icon="el-icon-s-promotion"
          >发送邮箱验证码</el-button
        >
      </el-input>
      <div class="buttons">
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthMail",
  data() {
    return {
      mail: "",
      authCode: ""
    };
  },
  methods: {
    onConfirm() {
      this.$router.push("/ChangePassword/change");
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
