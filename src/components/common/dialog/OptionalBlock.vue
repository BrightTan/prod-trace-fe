<template>
  <div class="optional-block">
    <div class="content">
      <div class="data" v-for="item in optionData" :key="item[config.key]">
        <div class="item" v-for="label in config.labels" :key="label.label">
          <label>{{ `${label.name}：` }}</label>
          <span>{{ item[label.label] }}</span>
        </div>
      </div>
      <Button
        type="blue"
        style="width:100%;margin-top:10px"
        :onClickButton="onOpen"
      >
        <img
          class="add-icon"
          :src="require('@/assets/add.svg')"
          alt="配置"
        /><span>配 置</span></Button
      >
    </div>
    <el-dialog
      :title="config.dialogTitle"
      :visible="show"
      :class="['lower-dialog', config.onlyOne ? 'onlyOne' : '']"
      :close-on-click-modal="false"
      style="visibility:visible"
      :width="config.dialogWidth"
      :before-close="onCancel"
    >
      <div class="table-container">
        <el-table
          ref="multipleTable"
          :data="tableData.data"
          :row-key="config.key"
          style="width: 100%"
          :reserve-selection="true"
          @select="handleSelectionChange"
          @select-all="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" label="#">
          </el-table-column>
          <el-table-column type="index" width="80" label="#"> </el-table-column>
          <el-table-column
            v-for="item in config.tableLabels"
            :key="item.label"
            :prop="item.label"
            :label="item.name"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="tableData.pageSize"
          :current-page="tableData.current"
          :page-count="tableData.totalPage"
          @current-change="onChangePage"
        >
        </el-pagination>
        <div class="footer-buttons">
          <Button type="blue" :onClickButton="onSave">保 存</Button>
          <Button type="dark" :onClickButton="onCancel">取 消</Button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Button from "@/components/common/Button.vue";

export default {
  name: "OptionalBlock",
  components: {
    Button,
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        labelWidth: "100px",
        dialogTitle: "请选择",
        dialogWidth: "600px",
        key: "label1",
        onlyOne: true,
        tableLabels: [
          {
            label: "label1",
            name: "示例标签1",
          },
          {
            label: "label2",
            name: "示例标签2",
          },
          {
            label: "label3",
            name: "示例标签3",
          },
        ],
        labels: [
          {
            label: "label1",
            name: "示例标签1",
          },
          {
            label: "label2",
            name: "示例标签2",
          },
          {
            label: "label3",
            name: "示例标签3",
          },
        ],
        defaultValue: [
          {
            label1: "1111",
            label2: "sdfsdfsdfsdfwefwgwe",
            label3: "sdfsdfsdfsdfwefwgwe",
          },
          {
            label1: "111",
            label2: "sdfsdfsdfsdfwefwgwe",
            label3: "sdfsdfsdfsdfwefwgwe",
          },
          {
            label1: "4444",
            label2: "sdfsdfsdfsdfwefwgwe",
            label3: "sdfsdfsdfsdfwefwgwe",
          },
        ],
        getTableData: () => {
          //请求参数pageNumber, pageSize
          return Promise.resolve({
            curPage: 1,
            totalPage: 102,
            data: [
              {
                label1: "111",
                label2: "222",
                label3: "333",
              },
              {
                label1: "1111",
                label2: "2222",
                label3: "3333",
              },
              {
                label1: "11111111",
                label2: "22222222",
                label3: "33333333",
              },
              {
                label1: "4444",
                label2: "5555",
                label3: "6666",
              },
              {
                label1: "777777",
                label2: "888888",
                label3: "999999",
              },
            ],
          });
        },
      }),
    },
    data: {
      type: Array,
      default: () => [],
    },
    onCloseTableDialog: {
      type: Function,
      default: () => {},
    },
    onOpenTableDialog: {
      type: Function,
      default: () => {},
    },
    onSelectSave: {
      type: Function,
      default: () => {},
    },
  },
  created() {
    this.optionData = this.$props.config.default();
  },
  data() {
    return {
      optionData: [],
      tableData: {
        current: 1,
        pageSize: 10,
        totalPage: 1,
        data: [],
      },
      show: false,
    };
  },
  methods: {
    onGetData(pageNumber) {
      return this.$props.config
        .getTableData(pageNumber, this.tableData.pageSize)
        .then((transformedData) => {
          this.tableData.current = transformedData.curPage;
          this.tableData.totalPage = transformedData.totalPage;
          this.tableData.data = transformedData.data;
        });
    },
    onChangePage(pageNumber) {
      this.onGetData(pageNumber).then(() => {
        const key = this.$props.config.key;
        this.optionData.forEach((row) => {
          const selectedRow = this.tableData.data.find((tableRow) => {
            return tableRow[key] === row[key];
          });
          selectedRow &&
            this.$refs.multipleTable.toggleRowSelection(selectedRow, true);
        });
      });
    },
    onOpen() {
      this.$props.onOpenTableDialog();
      this.show = true;
      this.onGetData(1).then(() => {
        const key = this.$props.config.key;
        this.optionData.forEach((row) => {
          const selectedRow = this.tableData.data.find((tableRow) => {
            return tableRow[key] === row[key];
          });
          selectedRow &&
            this.$refs.multipleTable.toggleRowSelection(selectedRow, true);
        });
      });
    },
    handleSelectionChange(selection, row) {
      if (this.$props.config.onlyOne && row) {
        const tableRef = this.$refs.multipleTable;
        tableRef.clearSelection();
        tableRef.toggleRowSelection(row, true);
        this.optionData = [row];
      } else {
        this.optionData = selection;
      }
    },
    onSave() {
      this.$props.onSelectSave(this.optionData);
      this.tableData = {
        current: 1,
        pageSize: 10,
        totalPage: 1,
        data: [],
      };
      this.show = false;
      this.$props.onCloseTableDialog();
    },
    onCancel() {
      this.optionData = this.$props.data;
      this.tableData = {
        current: 1,
        pageSize: 10,
        totalPage: 1,
        data: [],
      };
      this.show = false;
      this.$props.onCloseTableDialog();
    },
    toSyncData(data) {
      this.optionData = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.optional-block {
  .onlyOne /deep/ thead > tr > th:first-child {
    visibility: hidden;
  }
  .table-container {
    .el-pagination {
      padding: 10px 0;
      text-align: center;
    }
  }
  .lower-dialog {
    z-index: 2000 !important;
  }
  & > .content {
    border: 2px dotted rgb(255, 181, 71);
    border-radius: 10px;
    padding: 10px 5px;
    .add-icon {
      width: 20px;
      vertical-align: middle;
      margin-right: 10px;
      & + span {
        vertical-align: middle;
        line-height: 20px;
      }
    }
    & > .data {
      background: rgba(0, 0, 0, 0.5) url(../../../assets/dot_pattern.png) repeat;
      border-radius: 4px;
      padding: 10px;
      & + .data {
        margin-top: 10px;
      }
      & > .item {
        color: white;
        & > label {
          font-weight: bold;
        }
      }
    }
  }
  .footer-buttons {
    text-align: right;
  }
}
</style>
