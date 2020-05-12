<template>
  <ScrollBar>
    <el-dialog
      title="农产品溯源码"
      :visible="showDialog"
      width="400px"
      :close-on-click-modal="false"
      :before-close="handleCloseAddDlg"
    >
      <div class="qr-code">
        <img :src="qrCode.url" alt="" />
        <Button
          type="green"
          style="width: 100%; margin-top: 10px"
          :onClickButton="onDownload"
          >下载到本地</Button
        >
      </div>
    </el-dialog>
    <div class="check-qr-code">
      <Breadcrumb
        :config="{
          data: { title: '企业信息管理', subTitle: '销售产品管理' },
        }"
      ></Breadcrumb>
      <div class="table-container">
        <el-table :data="productionInfos.data" style="width: 100%">
          <el-table-column type="index" width="100" label="#">
          </el-table-column>
          <el-table-column prop="sourceNumber" label="溯源码编号">
          </el-table-column>
          <el-table-column prop="productCompany" label="生产公司">
          </el-table-column>
          <el-table-column prop="processingCompany" label="加工公司">
          </el-table-column>
          <el-table-column prop="transportCompany" label="运输公司">
          </el-table-column>
          <el-table-column prop="saleCompany" label="销售公司"> </el-table-column>
          <el-table-column prop="saleNum" label="销售数量"> </el-table-column>
          <el-table-column prop="salesmanName" label="销售员姓名">
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="column">
              <Button
                type="blue"
                style="padding-top: 2px;padding-bottom:2px"
                :onClickButton="
                  () => {
                    onBuildQRCode(column.row);
                  }
                "
                >查看溯源码</Button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="productionInfos.pageSize"
          :current-page="productionInfos.current"
          :page-count="productionInfos.totalPage"
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
export default {
  name: "ProductionInfo",
  components: {
    Breadcrumb,
    ScrollBar,
    Button,
  },
  data() {
    return {
      showDialog: false,
      qrCode: {
        url: "",
        data: new Blob(),
      },
      productionInfos: {
        current: 1,
        pageSize: 10,
        totalPage: 1,
        data: [],
      },
    };
  },
  created() {
    this.onGetProdInfos(1);
  },
  methods: {
    onGetProdInfos(pageNumber) {
      this.$Http
        .get({
          url: "/admin/productInfo",
          data: {
            startPage: pageNumber,
            pageSize: this.productionInfos.pageSize,
          },
        })
        .then((res) => {
          this.productionInfos.current = res.data.curPage;
          this.productionInfos.totalPage = res.data.totalPage;
          this.productionInfos.data = res.data.productInfo;
        });
    },
    onChangePage(pageNumber) {
      this.onGetProdInfos(pageNumber);
    },
    onBuildQRCode(rawData) {
      //TODO:这里改成post请求
      this.$Http
        .post({
          url: "/admin/lookSourceCode",
          // url:
          //   "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2800220034,1269300702&fm=26&gp=0.jpg",
          data: {
            orderNumber: rawData.orderNumber,
          },
          responseType: "blob",
        })
        .then((res) => {
          const data = new Blob([res.data], {
            type: res.headers["content-type"],
          });
          this.qrCode = {
            url: window.URL.createObjectURL(data),
            data,
          };
          this.showDialog = true;
        });
    },
    onDownload() {
      if (this.qrCode.url === "") {
        this.$message.error("无图片数据");
        return;
      }
      const aLink = document.createElement("a");
      aLink.href = this.qrCode.url;
      aLink.download = "溯源码";
      aLink.click();
    },
    handleCloseAddDlg() {
      this.showDialog = false;
      this.qrCode = {
        url: "",
        data: new Blob(),
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.qr-code {
  img {
    width: 100%;
  }
}
.check-qr-code {
  padding: 20px;
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
