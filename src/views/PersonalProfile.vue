<template>
  <ScrollBar>
    <el-dialog
      title="修改基本信息"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="modify-profile">
        <div class="info-item">
          <span>用户名：</span
          ><el-input v-model="modifiedInfo.account" placeholder=""></el-input>
        </div>
        <div class="info-item">
          <span>手机号码：</span
          ><el-input v-model="modifiedInfo.phone" placeholder=""></el-input>
        </div>
        <div class="info-item">
          <span>邮箱：</span
          ><el-input v-model="modifiedInfo.email" placeholder=""></el-input>
        </div>
        <el-input
          class="code-input"
          placeholder="请输入验证码"
          v-model="modifiedInfo.authCode"
        >
          <el-button
            type="blue"
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
      </div>
      <span slot="footer" class="dialog-footer">
        <Button type="red" :onClickButton="handleClose">取 消</Button>
        <Button type="green" :onClickButton="onModify">保 存</Button>
      </span>
    </el-dialog>
    <div class="personal-profile">
      <Breadcrumb
        :config="{ data: { title: '用户信息管理', subTitle: '个人信息管理' } }"
      ></Breadcrumb>
      <div class="profile">
        <h3>个人资料</h3>
        <div class="info-item">
          <span>用户名：</span><span>{{ userInfo.username }}</span>
        </div>
        <div class="info-item">
          <span>手机号码：</span><span>{{ userInfo.tel }}</span>
        </div>
        <div class="info-item">
          <span>邮箱：</span><span>{{ userInfo.email }}</span>
        </div>
        <div class="buttons">
          <Button type="blue" :onClickButton="onOpenDialog"
            >修改基本信息</Button
          >
          <Button type="dark" :onClickButton="onGotoChangePasswd"
            >修改密码</Button
          >
        </div>
      </div>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import Button from "@/components/common/Button.vue";

const checkType = {
  NOT_NULL: "NOT_NULL",
  IS_EQUAL: "IS_EQUAL",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
};

export default {
  name: "PersonalProfile",
  components: {
    Breadcrumb,
    ScrollBar,
    Button,
  },
  data() {
    return {
      dialogVisible: false,
      userInfo: {
        username: "", //注意这里用户名是昵称
        userId: "",
        email: "", //邮箱是真正登录时的用户名
        tel: "",
        wechat: "",
        registered: 0, //企业类别  int类型
        compStatus: 0, //是否完善了企业信息 1完善了 0没有完善 int类型
      },
      modifiedInfo: {
        account: "小强",
        phone: "17784457842",
        email: "4741542641@qq.com",
        authCode: "",
      },
      emailButtonText: "发送邮箱验证码",
    };
  },
  created() {
    this.onGetUserInfo();
  },
  methods: {
    onGetUserInfo() {
      this.$Http
        .get({
          url: "/user/getUserInfo",
        })
        .then((res) => {
          this.userInfo = res.data;
        });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    onGotoChangePasswd() {
      this.$router.push("/ChangePassword");
    },
    onModify() {
      if (
        this.checkInputs(
          checkType.NOT_NULL,
          [this.modifiedInfo.account],
          "用户名不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.modifiedInfo.authCode],
          "验证码不能为空!"
        )
      ) {
        this.$Http
          .post({
            url: "/user/updateInfo",
            data: {
              nickname: this.modifiedInfo.account,
              tel: this.modifiedInfo.phone,
              wechat: "",
              verificationCode: this.modifiedInfo.authCode,
            },
          })
          .then(() => {
            this.$message.success("修改成功");
            this.onGetUserInfo();
            this.dialogVisible = false;
          });
      }
    },
    onOpenDialog() {
      this.resetData();
      this.dialogVisible = true;
    },
    getVerifyCode() {
      if (
        this.checkInputs(
          checkType.NOT_NULL,
          [this.modifiedInfo.email],
          "注册邮箱不能为空!"
        ) &&
        this.checkInputs(
          checkType.EMAIL,
          [this.modifiedInfo.email],
          "注册邮箱格式不正确!"
        )
      ) {
        this.$Http
          .get({
            url: "/user/getVerificationCode",
            data: {
              email: this.modifiedInfo.email,
            },
          })
          .then(() => {
            this.$message.success("成功发送邮箱验证码，请注意查收");
            this.countDown();
          });
      }
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
      this.modifiedInfo = {
        account: this.userInfo.username,
        phone: this.userInfo.tel,
        email: this.userInfo.email,
        authCode: "",
      };
      this.emailButtonText = "发送邮箱验证码";
    },
  },
};
</script>
<style lang="scss" scoped>
.modify-profile {
  .info-item {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    span:first-child {
      display: inline-flex;
      width: 100px;
      align-items: center;
      font-weight: bold;
    }
    .el-input {
      margin-left: 30px;
    }
  }
}
.personal-profile {
  padding: 20px;
  .profile {
    display: inline-flex;
    flex-direction: column;
    margin-top: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    padding: 20px 50px;
    h3 {
      color: white;
      margin-bottom: 40px;
    }
    .info-item {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      span {
        display: inline-block;
        text-align: left;
        padding: 10px 20px;
        background-color: rgba(0, 0, 0, 0.2);
        color: white;
        border-radius: 4px;
      }
      span:first-child {
        width: 100px;
      }
      span:last-child {
        width: 200px;
        margin-left: 30px;
      }
    }
    .buttons {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
