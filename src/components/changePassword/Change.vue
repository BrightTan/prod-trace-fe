<template>
  <div class="auth-mail">
    <div class="title">
      <div></div>
      <div>修改账户密码</div>
      <span>农产品可溯源数据管理系统</span>
    </div>
    <div class="form">
      <el-input
        class="password-input"
        placeholder="请输入新密码"
        type="password"
        v-model="password"
        suffix-icon="el-icon-key"
      >
      </el-input>
      <el-input
        type="password"
        placeholder="请再次输入密码"
        v-model="passwordAgain"
        suffix-icon="el-icon-key"
      >
      </el-input>
      <div class="buttons">
        <el-button type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Change",
  data() {
    return {
      passwordAgain: "",
      password: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.auth-mail {
  .title {
    color: white;
    position: relative;
    div:nth-child(1) {
      width: 40px;
      height: 5px;
      position: absolute;
      background-color: #1ccdaa;
      top: -4px;
      left: 100px;
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
