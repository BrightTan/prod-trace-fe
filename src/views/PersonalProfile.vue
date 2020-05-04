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
          ><el-input v-model="modifiedInfo.mail" placeholder=""></el-input>
        </div>
        <el-input
          class="code-input"
          placeholder="请输入验证码"
          v-model="modifiedInfo.authCode"
        >
          <Button type="dark" slot="append" icon="el-icon-s-promotion"
            >发送邮箱验证码</Button
          >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <Button type="red" :onClickButton="() => (dialogVisible = false)"
          >取 消</Button
        >
        <Button type="green" :onClickButton="() => (dialogVisible = false)"
          >确 定</Button
        >
      </span>
    </el-dialog>
    <div class="personal-profile">
      <Breadcrumb
        :config="{ data: { title: '用户信息管理', subTitle: '个人信息管理' } }"
      ></Breadcrumb>
      <div class="profile">
        <h3>个人资料</h3>
        <div class="info-item"><span>用户名：</span><span>小强</span></div>
        <div class="info-item">
          <span>手机号码：</span><span>17784457842</span>
        </div>
        <div class="info-item">
          <span>邮箱：</span><span>4741542641@qq.com</span>
        </div>
        <div class="buttons">
          <Button type="blue" :onClickButton="() => (dialogVisible = true)"
            >修改基本信息</Button
          >
          <Button type="dark">修改密码</Button>
        </div>
      </div>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import Button from "@/components/common/Button.vue";
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
      modifiedInfo: {
        account: "小强",
        phone: "17784457842",
        mail: "4741542641@qq.com",
        authCode: "",
      },
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      console.log("dialog close");
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
