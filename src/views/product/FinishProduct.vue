<template>
  <ScrollBar>
    <div class="finish-product">
      <Breadcrumb
        :config="{ data: { title: '产品信息管理', subTitle: '完成产品生产' } }"
      ></Breadcrumb>
      <div class="table-container">
        <el-table :data="productionInfos.data" style="width: 100%">
          <el-table-column type="index" width="100" label="#">
          </el-table-column>
          <el-table-column
            prop="productionBatchNumber"
            label="初代农产品批次编号"
          >
          </el-table-column>
          <el-table-column prop="sourceId" label="溯源码编号">
          </el-table-column>
          <el-table-column prop="reapTime" label="收割时间"> </el-table-column>
          <el-table-column prop="fertilizerTime" label="施肥次数">
          </el-table-column>
          <el-table-column prop="pesticidePlantTime" label="农药播撒数">
          </el-table-column>
          <el-table-column prop="seedName" label="种子名称"> </el-table-column>
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
                >完成生产</Button
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
import Button from '@/components/common/Button.vue'
export default {
  name: "FinishProduct",
  components: {
    Breadcrumb,
    ScrollBar,
    Button
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
          url: "/production/inProduction",
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
    onFinish(rawData) {
      this.$Http
        .post({
          url: "/production/completeProduce",
          data: {
            productionId: rawData.productionId,
          },
        })
        .then(() => {
          this.onGetProdInfos(this.productionInfos.current)
          this.$message.success("成功完成生产");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.finish-product {
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
