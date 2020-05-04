<template>
  <ScrollBar>
    <div class="process-ways">
      <Breadcrumb
        :config="{ data: { title: '加工信息管理', subTitle: '加工工艺' } }"
      ></Breadcrumb>
      <div class="header">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="processWays.pageSize"
          :current-page="processWays.current"
          :page-count="processWays.totalPage"
          @current-change="onChangePage"
        >
        </el-pagination>
        <Button type="blue">新增加工工艺</Button>
      </div>
      <ProcessBlock :config="processWays.data"></ProcessBlock>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import ProcessBlock from "@/components/process/ProcessBlock.vue";
import Button from "@/components/common/Button.vue";
export default {
  name: "ProcessWays",
  components: {
    Breadcrumb,
    ScrollBar,
    ProcessBlock,
    Button,
  },
  data() {
    return {
      processWays: {
        current: 1,
        pageSize: 10,
        totalPage: 1,
        data: [],
      },
    };
  },
  created() {
    this.onGetProcessWays(1);
  },
  methods: {
    onGetProcessWays(pageNumber) {
      this.$Http
        .get({
          url: "/processing/technique",
          data: {
            startPage: pageNumber,
            pageSize: this.processWays.pageSize,
          },
        })
        .then((res) => {
          this.processWays.current = res.data.curPage;
          this.processWays.totalPage = res.data.totalPage;
          this.processWays.data = res.data.technique;
        });
    },
    onChangePage(pageNumber) {
      this.onGetProcessWays(pageNumber);
    },
  },
};
</script>
<style lang="scss" scoped>
.process-ways {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
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
}
</style>
