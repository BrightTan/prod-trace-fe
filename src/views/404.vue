<template>
  <div class="change-password-page">
    <ScrollBar>
      <div class="page-container">
        <img src="../assets/logo-big.png" alt="Logo" class="logo" />
        <div class="content">
          <div class="title">
            <div>
              <div></div>
              <span>ERROR</span> 404
            </div>
            <div>
              <div></div>
              这里可能出错了
            </div>
            <span>你要找的页面不存在</span>
            <div class="buttons">
              <el-button type="primary"
                ><i class="el-icon-refresh"></i>刷新尝试</el-button
              >
              <el-button type="primary"
                ><i class="el-icon-s-home"></i>返回首页</el-button
              >
              <el-button type="primary"
                ><i class="el-icon-phone"></i>联系客服</el-button
              >
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
  name: "Login",
  components: { ScrollBar },
  data() {
    return {
      account: "",
      password: ""
    };
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
    .title {
      color: white;
      & > div {
        position: relative;
        font-size: 50px;
        margin-top: 20px;
        margin-bottom: 5px;
        font-weight: bold;
        &:nth-child(2) {
          font-size: 20px;
          div {
            width: 30px;
            left: 110px;
          }
        }
        div {
          width: 50px;
          height: 5px;
          position: absolute;
          background-color: #1ccdaa;
          top: -4px;
          left: 210px;
        }
        span {
          font-size: 50px;
          font-family: "Times New Roman", Times, serif;
        }
      }
      & > span {
        font-size: 12px;
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
      button:nth-child(2) {
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
        background-color: #ff7b76;
        border-color: #ff7b76;
        color: #f2f2f2;
        &:hover {
          background-color: #ff4f48;
          border-color: #ff4f48;
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
