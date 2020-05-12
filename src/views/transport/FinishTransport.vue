<template>
  <ScrollBar>
    <div class="finish-transport">
      <Breadcrumb
        :config="{ data: { title: '运输信息管理', subTitle: '完成运输工作' } }"
      ></Breadcrumb>
      <div class="table-container">
        <el-table :data="productionInfos.data" style="width: 100%">
          <el-table-column type="index" width="100" label="#">
          </el-table-column>
          <el-table-column prop="sourceNumber" label="溯源码编号">
          </el-table-column>
          <el-table-column prop="waybillNumber" label="运单编号">
          </el-table-column>
          <el-table-column prop="processCompany" label="产品加工企业">
          </el-table-column>
          <el-table-column prop="transportWay" label="运输方式">
          </el-table-column>
          <el-table-column prop="waybillTo" label="运单去向"> </el-table-column>
          <el-table-column prop="transportHead" label="运输负责人">
          </el-table-column>
          <el-table-column prop="transportTime" label="运输时长">
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="column">
              <Button
                type="blue"
                style="padding-top: 2px;padding-bottom:2px"
                :onClickButton="
                  () => {
                    onFinish(column.row);
                  }
                "
                >完成加工</Button
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
  name: "FinishTransport",
  components: {
    Breadcrumb,
    ScrollBar,
    Button,
  },
  data() {
    return {
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
          url: "/transport/transportInfo",
          data: {
            startPage: pageNumber,
            pageSize: this.productionInfos.pageSize,
          },
        })
        .then((res) => {
          this.productionInfos.current = res.data.curPage;
          this.productionInfos.totalPage = res.data.totalPage;
          this.productionInfos.data = res.data.transportInfo;
        });
    },
    onChangePage(pageNumber) {
      this.onGetProdInfos(pageNumber);
    },
    onFinish(rawData) {
      this.$Http
        .post({
          url: "/transport/completeTransport",
          data: {
            waybillNumber: rawData.waybillNumber,
          },
        })
        .then(() => {
          this.onGetProdInfos(this.productionInfos.current);
          this.$message.success("成功完成运输");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.finish-transport {
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
