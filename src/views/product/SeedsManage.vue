<template>
  <ScrollBar>
    <el-dialog
      title="添加种子"
      :visible="addSeedDialog.visible"
      width="500px"
      :close-on-click-modal="false"
      :before-close="handleCloseAddDlg"
    >
      <div class="content">
        <div class="item">
          <span class="label">种子名称：</span
          ><el-input
            v-model="addSeedDialog.seedName"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="item">
          <span class="label">种子来源：</span
          ><el-input
            v-model="addSeedDialog.seedSource"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="item">
          <span class="label">成品名称：</span
          ><el-input
            v-model="addSeedDialog.finishedName"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="item">
          <span class="label">是否转基因：</span
          ><el-switch
            v-model="addSeedDialog.isTransgene"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <Button type="green" :onClickButton="addSeed">保存</Button>
        <Button type="dark" :onClickButton="handleCloseAddDlg">取消</Button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加种子"
      :visible="modifyDialog.visible"
      width="500px"
      :close-on-click-modal="false"
      :before-close="handleCloseModifyDlg"
    >
      <div class="content">
        <div class="item">
          <span class="label">种子名称：</span
          ><el-input
            v-model="modifyDialog.seedName"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="item">
          <span class="label">种子来源：</span
          ><el-input
            v-model="modifyDialog.seedSource"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="item">
          <span class="label">成品名称：</span
          ><el-input
            v-model="modifyDialog.finishedName"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="item">
          <span class="label">是否转基因：</span
          ><el-switch
            v-model="modifyDialog.isTransgene"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <Button type="green" :onClickButton="modifySeed">保存</Button>
        <Button type="dark" :onClickButton="handleCloseModifyDlg">取消</Button>
      </span>
    </el-dialog>
    <div class="seeds-manage">
      <div class="head">
        <Breadcrumb
          :config="{ data: { title: '产品信息管理', subTitle: '种子管理' } }"
        ></Breadcrumb>
        <Button
          type="blue"
          :onClickButton="() => (addSeedDialog.visible = true)"
          >新增种子</Button
        >
      </div>
      <div class="table-container">
        <el-table :data="seedData.data" style="width: 100%">
          <el-table-column type="index" width="100" label="#">
          </el-table-column>
          <el-table-column prop="seedId" label="种子ID"> </el-table-column>
          <el-table-column prop="seedName" label="种子名称"> </el-table-column>
          <el-table-column prop="seedSource" label="种子来源">
          </el-table-column>
          <el-table-column prop="isTransgene" label="是否转基因">
            <template slot-scope="column">
              {{ column.row.isTransgene ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column prop="finishedName" label="成品名称">
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="column">
              <Button
                type="green"
                style="padding-top: 2px;padding-bottom:2px"
                :onClickButton="
                  () => {
                    onOpenModifyDlg(column.row);
                  }
                "
                >修改</Button
              >
              <Button
                type="red"
                style="padding-top: 2px;padding-bottom:2px"
                :onClickButton="
                  () => {
                    deleteSeed(column.row.seedId);
                  }
                "
                >删除</Button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="seedData.pageSize"
          :current-page="seedData.current"
          :page-count="seedData.totalPage"
          @current-change="onChangePage"
        >
        </el-pagination>
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
  name: "SeedsManage",
  components: {
    Breadcrumb,
    ScrollBar,
    Button,
  },
  data() {
    return {
      seedData: {
        current: 1,
        pageSize: 10,
        totalPage: 1,
        data: [],
      },
      addSeedDialog: {
        visible: false,
        seedName: "",
        seedSource: "",
        isTransgene: false,
        finishedName: "",
      },
      modifyDialog: {
        seedId: "",
        visible: false,
        seedName: "",
        seedSource: "",
        isTransgene: false,
        finishedName: "",
      },
    };
  },
  created() {
    this.getSeedData(1);
  },
  methods: {
    getSeedData(pageNumber) {
      this.$Http
        .get({
          url: "/production/seedMange",
          data: {
            startPage: pageNumber,
            pageSize: this.seedData.pageSize,
          },
        })
        .then((res) => {
          this.seedData.current = res.data.curPage;
          this.seedData.totalPage = res.data.totalPage;
          this.seedData.data = res.data.seedManage;
        });
    },
    onChangePage(pageNumber) {
      this.getSeedData(pageNumber);
    },
    addSeed() {
      if (
        this.checkInputs(
          checkType.NOT_NULL,
          [this.addSeedDialog.seedName],
          "种子名称不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.addSeedDialog.seedSource],
          "种子来源不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.addSeedDialog.finishedName],
          "成品名称不能为空!"
        )
      ) {
        this.$Http
          .post({
            url: "/production/addSeed",
            data: {
              seedName: this.addSeedDialog.seedName,
              seedSource: this.addSeedDialog.seedSource,
              isTransgene: this.addSeedDialog.isTransgene ? 1 : 0,
              finishedName: this.addSeedDialog.finishedName,
            },
          })
          .then(() => {
            this.$message.success("添加种子成功");
            this.getSeedData(1);
            this.addSeedDialog = {
              visible: false,
              seedName: "",
              seedSource: "",
              isTransgene: false,
              finishedName: "",
            };
          });
      }
    },
    modifySeed() {
      if (
        this.checkInputs(
          checkType.NOT_NULL,
          [this.modifyDialog.seedName],
          "种子名称不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.modifyDialog.seedSource],
          "种子来源不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.modifyDialog.finishedName],
          "成品名称不能为空!"
        )
      ) {
        this.$Http
          .post({
            url: "/production/changeSeed",
            data: {
              seedId: this.modifyDialog.seedId,
              seedName: this.modifyDialog.seedName,
              seedSource: this.modifyDialog.seedSource,
              isTransgene: this.modifyDialog.isTransgene ? 1 : 0,
              finishedName: this.modifyDialog.finishedName,
            },
          })
          .then(() => {
            this.$message.success("修改种子成功");
            this.getSeedData(1);
            this.modifyDialog = {
              seedId: "",
              visible: false,
              seedName: "",
              seedSource: "",
              isTransgene: false,
              finishedName: "",
            };
          });
      }
    },
    deleteSeed(id) {
      this.$Http
        .post({
          url: "/production/deleteSeed",
          data: {
            seedId: id,
          },
        })
        .then(() => {
          this.getSeedData(this.seedData.current);
          this.$message.success("删除成功");
        });
    },
    onOpenModifyDlg(row) {
      this.modifyDialog = {
        visible: true,
        seedId: row.seedId,
        seedName: row.seedName,
        seedSource: row.seedSource,
        isTransgene: row.isTransgene ? true : false,
        finishedName: row.finishedName,
      };
    },
    handleCloseAddDlg() {
      this.addSeedDialog = {
        visible: false,
        seedName: "",
        seedSource: "",
        isTransgene: false,
        finishedName: "",
      };
    },
    handleCloseModifyDlg() {
      this.modifyDialog = {
        visible: false,
        seedId: "",
        seedName: "",
        seedSource: "",
        isTransgene: false,
        finishedName: "",
      };
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
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 10px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    .label {
      width: 150px;
    }
    .el-switch {
      margin-right: 250px;
    }
  }
}
.seeds-manage {
  padding: 20px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table-container {
    margin: 20px 0;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
    .el-table {
      background: transparent;
      &::before {
        background-color: transparent;
      }
      & /deep/ tr {
        background-color: transparent !important;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.6);
      }
      & /deep/ th {
        background-color: transparent !important;
        color: white;
      }
      & /deep/ tbody tr.el-table__row {
        &:hover td {
          background-color: rgba(0, 0, 0, 0.2) !important;
          color: white;
        }
      }
    }
    .el-pagination {
      padding: 20px 0;
      & /deep/ button,
      & /deep/ .number,
      & /deep/ .more {
        background-color: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.603);
        &:hover {
          color: white;
          background-color: rgba(0, 0, 0, 0.2);
          i {
            color: white;
          }
        }
      }
      & /deep/ .number.active {
        color: white;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
