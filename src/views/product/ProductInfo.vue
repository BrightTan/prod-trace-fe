<template>
  <ScrollBar>
    <el-dialog
      :title="addProdDialog.isUpdate ? '修改生产信息' : '新增生产信息'"
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
            :file-list="file"
            :on-remove="onRemoveImage"
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
            :step="1"
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
            :step="1"
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
        <Button
          v-if="!addProdDialog.isUpdate"
          type="green"
          :onClickButton="addProd"
          >保存</Button
        >
        <Button
          v-if="addProdDialog.isUpdate"
          type="green"
          :onClickButton="updateProd"
          >保存</Button
        >
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
        >新增生产信息</Button
      >
    </div>
    <SeedProduction
      :config="productionInfos.data"
      :onModify="onModify"
      :onDelete="onDelete"
    ></SeedProduction>
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
      file: [],
      addProdDialog: {
        isUpdate: false,
        visible: false,
        imageFile: "", //图片信息
        fieldId: "", //所属田块id
        fertilizerTime: "", //	施肥次数
        pesticidePlantTime: "", //农药播撒次数
        reapTime: "", //收割时间
        seedId: "", //seedId
        productionId: "", //产品ID
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
          [this.addProdDialog.imageFile],
          "种子图片不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.addProdDialog.fieldId],
          "所属田块不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.addProdDialog.seedId],
          "种子名称不能为空!"
        )
      ) {
        this.$Http
          .post({
            url: "/production/addProduction",
            data: {
              productionId: this.addProdDialog.productionId,
              imageFile: this.addProdDialog.imageFile,
              fieldId: this.addProdDialog.fieldId,
              fieldName: this.fieldInfo.find((value) => {
                return value.fieldId === this.addProdDialog.fieldId;
              }).fieldName,
              fertilizerTime: this.addProdDialog.fertilizerTime,
              pesticidePlantTime: this.addProdDialog.pesticidePlantTime,
              reapTime: this.addProdDialog.reapTime,
              seedId: this.addProdDialog.seedId,
              seedName: this.seedInfo.find((value) => {
                return (value.seedId = this.addProdDialog.seedId);
              }).seedName,
            },
          })
          .then(() => {
            this.$message.success("添加种子成功");
            this.onGetProdInfos(1);
            this.addProdDialog = {
              isUpdate: false,
              visible: false,
              imageFile: "",
              fieldId: "",
              fertilizerTime: "",
              pesticidePlantTime: "",
              reapTime: "",
              seedId: "",
              productionId: "",
            };
            this.fieldInfo = [];
            this.seedInfo = [];
          });
      }
    },
    updateProd() {
      if (
        this.checkInputs(
          checkType.NOT_NULL,
          [this.addProdDialog.imageFile],
          "种子图片不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.addProdDialog.fieldId],
          "所属田块不能为空!"
        ) &&
        this.checkInputs(
          checkType.NOT_NULL,
          [this.addProdDialog.seedId],
          "种子名称不能为空!"
        )
      ) {
        this.$Http
          .post({
            url: "/production/updateProduction",
            data: {
              productionId: this.addProdDialog.productionId,
              imageFile: this.addProdDialog.imageFile,
              fieldId: this.addProdDialog.fieldId,
              fieldName: this.fieldInfo.find((value) => {
                return value.fieldId === this.addProdDialog.fieldId;
              }).fieldName,
              fertilizerTime: this.addProdDialog.fertilizerTime,
              pesticidePlantTime: this.addProdDialog.pesticidePlantTime,
              reapTime: this.addProdDialog.reapTime,
              seedId: this.addProdDialog.seedId,
              seedName: this.seedInfo.find((value) => {
                return (value.seedId = this.addProdDialog.seedId);
              }).seedName,
            },
          })
          .then(() => {
            this.$message.success("修改种子成功");
            this.onGetProdInfos(this.productionInfos.current);
            this.addProdDialog = {
              isUpdate: false,
              visible: false,
              imageFile: "",
              fieldId: "",
              fertilizerTime: "",
              pesticidePlantTime: "",
              reapTime: "",
              seedId: "",
              productionId: "",
            };
            this.fieldInfo = [];
            this.seedInfo = [];
          });
      }
    },
    onModify(rawData) {
      this.file = [
        {
          name: rawData.picUrl.split("/").pop(),
          url: rawData.picUrl,
        },
      ];
      this.addProdDialog = {
        isUpdate: true,
        visible: true,
        imageFile: rawData.picUrl,
        fieldId: rawData.fieldId,
        fertilizerTime: rawData.fertilizerTime,
        pesticidePlantTime: rawData.pesticidePlantTime,
        reapTime: rawData.reapTime,
        seedId: rawData.seedId,
        productionId: rawData.productionId,
      };
    },
    onDelete(rawData) {
      this.$Http
        .post({
          url: "/production/deleteProduction",
          data: {
            productionId: rawData.productionId,
          },
        })
        .then(() => {
          this.$message.success("删除成功！");
          this.onGetProdInfos(this.productionInfos.current);
        });
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
          data: {
            startPage: 1,
            pageSize: 10000,
          },
        })
        .then((res) => {
          this.seedInfo = res.data.seedManage;
        })
        .catch(() => {
          this.seedInfo = [];
        });
    },
    handleCloseAddDlg() {
      this.file = [];
      this.addProdDialog = {
        isUpdate: false,
        visible: false,
        imageFile: "",
        fieldId: "",
        fieldName: false,
        fertilizerTime: "",
        pesticidePlantTime: "",
        reapTime: "",
        seedName: "",
        seedId: "",
        productionId: "",
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
    onUploadImage(response, file) {
      switch (response.code) {
        case 1:
          this.addProdDialog.imageFile = response.data.url;
          this.addProdDialog.productionId = response.data.productionId;
          this.addProdDialog.file = [
            {
              name: file.name,
              url: response.data.url,
            },
          ];
          break;
        case 2:
          this.addProdDialog.imageFile = response.data.url;
          this.addProdDialog.productionId = response.data.productionId;
          this.addProdDialog.file = [
            {
              name: file.name,
              url: response.data.url,
            },
          ];
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
    onRemoveImage() {
      this.file = [];
      this.addProdDialog.imageFile = "";
    },
    onUploadFail() {
      this.$message.error("上传失败");
      this.file = [];
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
