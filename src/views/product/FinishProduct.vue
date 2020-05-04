<template>
  <ScrollBar>
    <div class="finish-product">
      <Breadcrumb
        :config="{ data: { title: '产品信息管理', subTitle: '完成产品生产' } }"
      ></Breadcrumb>
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
export default {
  name: "FinishProduct",
  components: {
    Breadcrumb,
    ScrollBar,
  },
  data() {
    return {
      seedData: {
        current: 1,
        pageSize: 10,
        totalPage: 1,
        data: [],
      },
    };
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
