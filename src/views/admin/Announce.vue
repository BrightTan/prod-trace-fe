<template>
  <ScrollBar>
    <div class="admin-announce">
      <Breadcrumb
        :config="{ data: { title: '企业信息管理', subTitle: '公告管理' } }"
      ></Breadcrumb>
      <div class="announce">
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="item display">
              <h3>公告</h3>
              <div class="content">{{ announcement }}</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item modify">
              <h3>更改公告</h3>
              <el-input
                class="content"
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="modifyAnnounce"
              >
              </el-input>
              <div class="footer">
                <Button
                  type="blue"
                  style="padding: 4px 14px"
                  :onClickButton="onModifyAnnounce"
                  >保 存</Button
                >
                <Button
                  type="dark"
                  style="padding: 4px 14px;margin-left: 10px"
                  :onClickButton="
                    () => {
                      this.modifyAnnounce = '';
                    }
                  "
                  >清 空</Button
                >
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import Button from "@/components/common/Button.vue";
export default {
  name: "AdminAnnounce",
  components: {
    Breadcrumb,
    ScrollBar,
    Button,
  },
  data() {
    return {
      announcement: "",
      modifyAnnounce: "",
    };
  },
  created() {
    this.onGetAnnounce();
  },
  methods: {
    onGetAnnounce() {
      this.$Http
        .get({
          url: "/admin/announcement",
        })
        .then((res) => {
          this.announcement = res.data.announcement;
        });
    },
    onModifyAnnounce() {
      this.$Http
        .post({
          url: "/admin/updateAnnouncement",
          data: {
            announcement: this.modifyAnnounce,
          },
        })
        .then(() => {
          this.$message.success("更新公告成功");
          this.onGetAnnounce();
          this.modifyAnnounce = "";
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.admin-announce {
  padding: 20px;
  .announce {
    margin-top: 20px;
    .item {
      width: 100%;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
      box-shadow: 0px 4px 5px 1px rgba(175, 175, 175, 0.1);
      box-sizing: border-box;
      padding: 20px;
      color: white;
      h3 {
        text-align: center;
      }
      text-align: right;
      & > .content {
        text-align: left;
        padding: 10px 0 20px 0;
        font-weight: bold;
        & /deep/ .el-textarea__inner {
          font-weight: bold;
          background-color: rgba(0, 0, 0, 0.493);
          border: none;
          color: white;
        }
      }
      &.display {
        & > span {
          color: rgb(114, 114, 114);
        }
      }
    }
  }
}
</style>
