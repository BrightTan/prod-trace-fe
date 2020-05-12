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
              <el-radio-button size="medium" :label="0"
                >生产公司</el-radio-button
              >
              <el-radio-button size="medium" :label="1"
                >加工公司</el-radio-button
              >
              <el-radio-button size="medium" :label="2"
                >运输公司</el-radio-button
              >
              <el-radio-button size="medium" :label="3"
                >销售公司</el-radio-button
              >
            </el-radio-group>
            <el-input
              class="account-input"
              placeholder="请输入用户名"
              v-model="registInfo.account"
              suffix-icon="el-icon-s-custom"
              @keyup.native.enter="onRegist"
            >
            </el-input>
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="registInfo.password"
              suffix-icon="el-icon-key"
              @keyup.native.enter="onRegist"
            >
            </el-input>
            <el-input
              type="password"
              placeholder="请再次输入密码"
              v-model="registInfo.passwordAgain"
              suffix-icon="el-icon-key"
              @keyup.native.enter="onRegist"
            >
            </el-input>
            <el-input
              placeholder="请输入手机号码"
              v-model="registInfo.phone"
              suffix-icon="el-icon-phone"
              @keyup.native.enter="onRegist"
            >
            </el-input>
            <el-input
              placeholder="请输入注册邮箱"
              v-model="registInfo.email"
              suffix-icon="el-icon-message"
              @keyup.native.enter="onRegist"
            >
            </el-input>
            <el-input
              class="code-input"
              placeholder="请输入验证码"
              v-model="registInfo.authCode"
              @keyup.native.enter="onRegist"
            >
              <el-button
                slot="append"
                icon="el-icon-s-promotion"
                @click="getVerifyCode"
                :disabled="
                  emailButtonText !== '发送邮箱验证码' &&
                    emailButtonText !== '重新发送'
                "
                >{{ emailButtonText }}</el-button
              >
            </el-input>
            <div class="buttons">
              <el-button type="primary" @click="onRegist">注册</el-button>
            </div>
          </div>
        </div>
      </div>
    </ScrollBar>
  </div>
</template>

<script>
import ScrollBar from "@/components/common/ScrollBar.vue";

const checkType = {
  NOT_NULL: "NOT_NULL",
  IS_EQUAL: "IS_EQUAL",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
};

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
        email: "",
        authCode: "",
        companyClass: "",
      },
      emailButtonText: "发送邮箱验证码",
    };
  },
  methods: {
    onRegist() {
      if (
        this.checkInputs(
          checkType.NOT_NULL,
          [this.registInfo.companyClass],
          "请选择注册公司类型!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.registInfo.account],
          "用户名不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.registInfo.password],
          "密码不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.registInfo.passwordAgain],
          "请再次输入密码!"
        ) &&
        this.checkInputs(
          checkType.IS_EQUAL,
          [this.registInfo.password, this.registInfo.passwordAgain],
          "两次输入密码不一致!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.registInfo.phone],
          "手机号码不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.registInfo.email],
          "注册邮箱不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.registInfo.authCode],
          "验证码不能为空!"
        ) &&
        this.checkInputs(
          checkType.EMAIL,
          [this.registInfo.email],
          "注册邮箱格式不正确!"
        ) &&
        this.checkInputs(
          checkType.PHONE,
          [this.registInfo.phone],
          "手机号码格式不正确!"
        )
      ) {
        this.$Http
          .post({
            url: "/user/register",
            data: {
              registered: this.registInfo.companyClass,
              nickname: this.registInfo.account,
              tel: this.registInfo.phone,
              username: this.registInfo.email,
              password: this.registInfo.password,
              verificationCode: this.registInfo.authCode,
            },
          })
          .then(() => {
            this.$message.success("注册成功");
            switch (this.registInfo.companyClass) {
              case 0:
                this.$router.replace("/product/index");
                break;
              case 1:
                this.$router.replace("/process/index");
                break;
              case 2:
                this.$router.replace("/transport/index");
                break;
              case 3:
                this.$router.replace("/sale/index");
                break;
            }
          });
      }
    },
    getVerifyCode() {
      if (
        this.checkInputs(
          checkType.NOT_NULL,
          [this.registInfo.email],
          "注册邮箱不能为空!"
        ) &&
        this.checkInputs(
          checkType.EMAIL,
          [this.registInfo.email],
          "注册邮箱格式不正确!"
        )
      ) {
        this.$Http
          .get({
            url: "/user/getVerificationCode",
            data: {
              email: this.registInfo.email,
            },
          })
          .then(() => {
            this.$message.success("成功发送邮箱验证码，请注意查收");
            this.countDown();
          });
      }
    },
    onForgetPassword() {
      this.$router.push("/ChangePassword");
    },
    checkInputs(checkRuled, data, message) {
      let res = true;
      switch (checkRuled) {
        case checkType.NOT_NULL:
          data[0] === "" && (res = false);
          break;
        case checkType.IS_EQUAL:
          data[0] !== data[1] && (res = false);
          break;
        case checkType.EMAIL:
          !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.exec(data[0]) &&
            (res = false);
          break;
        case checkType.PHONE:
          !/^1[3456789]\d{9}$/.exec(data[0]) && (res = false);
          break;
      }
      !res && this.$message.error(message);
      return res;
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
      this.registInfo = {
        account: "",
        password: "",
        passwordAgain: "",
        phone: "",
        email: "",
        authCode: "",
        companyClass: "",
      };
      this.emailButtonText = "发送邮箱验证码";
    },
  },
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
        margin-bottom: 50px;
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
