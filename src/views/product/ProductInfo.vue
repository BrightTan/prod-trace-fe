<template>
  <ScrollBar>
    <el-dialog
      title="添加种子"
      :visible="addProdDialog.visible"
      width="600px"
      :close-on-click-modal="false"
      :before-close="handleCloseAddDlg"
    >
      <div class="content">
        <div class="item">
          <span class="label">原产品图片：</span
          ><el-upload
            class="upload-demo"
            drag
            action="/production/upload"
            accept="image/png, image/jpeg"
            :key="addProdDialog.visible"
            :on-success="onUploadImage"
            :on-error="onUploadFail"
            :limit="1"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </div>
        <div class="item">
          <span class="label">所属田块：</span
          ><el-select v-model="addProdDialog.fieldId" placeholder="请选择">
            <el-option
              v-for="item in fieldInfo"
              :key="item.fieldId"
              :label="item.fieldName"
              :value="item.fieldId"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="label">施肥次数：</span
          ><el-input-number
            :precision="0"
            v-model="addProdDialog.fertilizerTime"
            :min="0"
          ></el-input-number>
        </div>
        <div class="item">
          <span class="label">收割时间：</span
          ><el-date-picker
            v-model="addProdDialog.reapTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </div>
        <div class="item">
          <span class="label">农药播撒次数：</span
          ><el-input-number
            :precision="0"
            v-model="addProdDialog.pesticidePlantTime"
            :min="0"
          ></el-input-number>
        </div>
        <div class="item">
          <span class="label">种子名称：</span
          ><el-select v-model="addProdDialog.seedId" placeholder="请选择">
            <el-option
              v-for="item in seedInfo"
              :key="item.seedId"
              :label="item.seedName"
              :value="item.seedId"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <Button type="green" :onClickButton="addProd">保存</Button>
        <Button type="dark" :onClickButton="handleCloseAddDlg">取消</Button>
      </span>
    </el-dialog>
    <div class="product-info">
      <Breadcrumb
        :config="{ data: { title: '产品信息管理', subTitle: '产品生产信息' } }"
      ></Breadcrumb>
    </div>
    <div class="nav">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="productionInfos.pageSize"
        :current-page="productionInfos.current"
        :page-count="productionInfos.totalPage"
        @current-change="onChangePage"
      >
      </el-pagination>
      <Button
        type="blue"
        :onClickButton="
          () => (
            (addProdDialog.visible = true), onGetFieldInfo(), onGetSeedInfo()
          )
        "
        >新增种子</Button
      >
    </div>
    <SeedProduction :config="productionInfos.data"></SeedProduction>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import SeedProduction from "@/components/production/SeedProduction.vue";
import Button from "@/components/common/Button.vue";

const checkType = {
  NOT_NULL: "NOT_NULL",
  IS_EQUAL: "IS_EQUAL",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
};

export default {
  name: "ProductInfo",
  components: {
    Breadcrumb,
    ScrollBar,
    SeedProduction,
    Button,
  },
  created() {
    this.onGetProdInfos(1);
  },
  data() {
    return {
      productionInfos: {
        current: 1,
        pageSize: 12,
        totalPage: 1,
        data: [],
      },
      fieldInfo: [],
      seedInfo: [],
      addProdDialog: {
        visible: false,
        imageFile: "", //图片信息
        fieldId: "", //所属田块id
        fertilizerTime: "", //	施肥次数
        pesticidePlantTime: "", //农药播撒次数
        reapTime: "", //收割时间
        seedId: "", //seedId
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
  methods: {
    onGetProdInfos(pageNumber) {
      this.$Http
        .get({
          url: "/production/productionInfo",
          data: {
            startPage: pageNumber,
            pageSize: this.productionInfos.pageSize,
          },
        })
        .then((res) => {
          this.productionInfos.current = res.data.curPage;
          this.productionInfos.totalPage = res.data.totalPage;
          this.productionInfos.data = res.data.productionInfos;
        });
    },
    onChangePage(pageNumber) {
      this.onGetProdInfos(pageNumber);
    },
    addProd() {
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
    onGetFieldInfo() {
      this.$Http
        .get({
          url: "/production/fieldInfo",
        })
        .then((res) => {
          this.fieldInfo = res.data.fieldInfo;
        })
        .catch(() => {
          this.fieldInfo = [];
        });
    },
    onGetSeedInfo() {
      this.$Http
        .get({
          url: "/production/seedMange",
        })
        .then((res) => {
          this.seedInfo = res.data.seedManage;
        })
        .catch(() => {
          this.seedInfo = [];
        });
    },
    handleCloseAddDlg() {
      this.addProdDialog = {
        visible: false,
        imageFile: "",
        fieldId: "",
        fieldName: false,
        fertilizerTime: "",
        pesticidePlantTime: "",
        reapTime: "",
        seedName: "",
        seedId: "",
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
    onUploadImage(response) {
      switch (response.code) {
        case 1:
          this.addProdDialog.imageFile = response.data.url;
          break;
        case 2:
          this.addProdDialog.imageFile = response.data.url;
          this.$message.success(response.message);
          break;
        case -4:
          this.$message.error("您无权限操作");
          break;
        case 0:
        case -1:
          this.$message.error("请重新登录");
          break;
        case -2:
          this.$message.error(response.message);
          break;
        default:
          this.$message.error("上传失败");
      }
    },
    onUploadFail() {
      this.$message.error("上传失败");
    },
  },
};
</script>
<style lang="scss" scoped>
.product-info {
  padding: 20px;
}
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
    .el-select,
    .el-input-number,
    .el-date-editor {
      width: 360px;
    }
  }
}
.nav {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .el-pagination {
    & /deep/ button,
    & /deep/ .number,
    & /deep/ .more {
      background-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.803);
      &:hover {
        color: white !important;
        background-color: rgba(0, 0, 0, 0.2) !important;
        i {
          color: white !important;
        }
      }
    }
    & /deep/ .number.active {
      color: white !important;
      background-color: rgba(0, 0, 0, 0.2) !important;
    }
  }
}
</style>
