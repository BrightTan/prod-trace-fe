<template>
  <div class="compelete-company-info">
    <Dialog
      :config="config"
      :show="show"
      no-close
      :onConfirm="onConfirm"
    ></Dialog>
  </div>
</template>
<script>
import Dialog from "@/components/common/dialog/Dialog.vue";
export default {
  name: "CompeleteCompanyInfo",
  components: {
    Dialog,
  },
  data() {
    return {
      config: {
        title: "您需要完善企业信息",
        width: "600px",
        labelWidth: "120px",
        items: [],
      },
      show: true,
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$Http
        .get({
          url: "/user/getUserInfo",
        })
        .then((res) => {
          this.userInfo = res.data;
          let companyType = "";
          switch (res.data.registered) {
            case 0:
              companyType = "生产企业";
              this.config = {
                title: "您需要完善企业信息",
                width: "600px",
                labelWidth: "120px",
                items: [
                  {
                    type: "text",
                    label: "用户名",
                    variable: "username",
                    default: res.data.username,
                    disabled: true,
                  },
                  {
                    type: "text",
                    label: "企业类别",
                    variable: "companyType",
                    default: companyType,
                    disabled: true,
                  },
                  {
                    type: "text",
                    label: "企业名称",
                    variable: "compName",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业名称不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业名称",
                    },
                  },
                  {
                    type: "text",
                    label: "企业地址",
                    variable: "compAddr",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业地址不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业地址",
                    },
                  },
                  {
                    type: "text",
                    label: "企业电话",
                    variable: "compTel",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业电话不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业电话",
                    },
                  },
                  {
                    type: "computed",
                    label: "田块数量",
                    variable: "tianNumber",
                    computed: (formData) => {
                      if (formData && formData.compFields !== undefined) {
                        return formData.compFields.length;
                      } else {
                        return 0;
                      }
                    },
                  },
                  {
                    type: "form",
                    label: "企业田块",
                    variable: "compFields",
                    check: {
                      type: "NOT_ZERO",
                      message: "企业田块不能为空",
                    },
                    dialogConfig: {
                      labelWidth: "100px",
                      dialogTitle: "请填写田块信息",
                      dialogWidth: "600px",
                      key: "fieldAddr",
                      items: [
                        {
                          type: "number",
                          label: "田块盐碱度",
                          variable: "saltAlkali",
                          default: 0,
                          option: {
                            precision: 2,
                          },
                        },
                        {
                          type: "text",
                          label: "田块位置",
                          variable: "fieldAddr",
                          default: "",
                          check: {
                            type: "NOT_NULL",
                            message: "田块位置不能为空哦！",
                          },
                          option: {
                            placeholder: "请输入田块位置",
                          },
                        },
                        {
                          type: "number",
                          label: "田块种植次数",
                          variable: "plantNum",
                          default: 0,
                          option: {
                            precision: 0,
                            min: 0,
                            max: Infinity,
                          },
                        },
                      ],
                      default: () => [],
                    },
                  },
                  {
                    type: "block",
                    label: "合作加工公司",
                    variable: "compProcInfo",
                    check: {
                      type: "NOT_ZERO",
                      message: "合作加工公司不能为空",
                    },
                    dialogConfig: {
                      labelWidth: "100px",
                      dialogTitle: "请选择合作企业",
                      dialogWidth: "600px",
                      key: "compProcId",
                      onlyOne: true,
                      tableLabels: [
                        {
                          label: "compProcId",
                          name: "加工公司编号",
                        },
                        {
                          label: "compProcName",
                          name: "加工公司名称",
                        },
                      ],
                      labels: [
                        {
                          label: "compProcId",
                          name: "加工公司编号",
                        },
                        {
                          label: "compProcName",
                          name: "加工公司名称",
                        },
                      ],
                      default: () => [],
                      getTableData: (pageNumber, pageSize) => {
                        return this.$Http
                          .get({
                            url: "/production/compProcInfo",
                            data: {
                              startPage: pageNumber,
                              pageSize,
                            },
                          })
                          .then((res) => {
                            return Promise.resolve({
                              curPage: res.data.curPage,
                              totalPage: res.data.totalPage,
                              data: res.data.compProcInfo,
                            });
                          });
                      },
                    },
                  },
                ],
              };
              break;
            case 1:
              companyType = "加工企业";
              this.config = {
                title: "您需要完善企业信息",
                width: "600px",
                labelWidth: "120px",
                items: [
                  {
                    type: "text",
                    label: "用户名",
                    variable: "username",
                    default: res.data.username,
                    disabled: true,
                  },
                  {
                    type: "text",
                    label: "企业类别",
                    variable: "companyType",
                    default: companyType,
                    disabled: true,
                  },
                  {
                    type: "text",
                    label: "企业名称",
                    variable: "compName",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业名称不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业名称",
                    },
                  },
                  {
                    type: "text",
                    label: "企业地址",
                    variable: "compAddr",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业地址不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业地址",
                    },
                  },
                  {
                    type: "text",
                    label: "企业电话",
                    variable: "compTel",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业电话不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业电话",
                    },
                  },
                  {
                    type: "text",
                    label: "企业负责人",
                    variable: "compPrincipal",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业负责人不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业负责人",
                    },
                  },
                  {
                    type: "computed",
                    label: "产品线数量",
                    variable: "prodLineNumber",
                    computed: (formData) => {
                      if (formData && formData.productLineInfo !== undefined) {
                        return formData.productLineInfo.length;
                      } else {
                        return 0;
                      }
                    },
                  },
                  {
                    type: "form",
                    label: "生产线",
                    variable: "productLineInfo",
                    check: {
                      type: "NOT_ZERO",
                      message: "生产线信息不能为空",
                    },
                    dialogConfig: {
                      labelWidth: "100px",
                      dialogTitle: "请填写生产线信息",
                      dialogWidth: "600px",
                      key: "fieldAddr",
                      items: [
                        {
                          type: "text",
                          label: "产品线名称",
                          variable: "productlineName",
                          default: "",
                          check: {
                            type: "NOT_NULL",
                            message: "产品线名称不能为空哦！",
                          },
                          option: {
                            placeholder: "请输入产品线名称",
                          },
                        },
                        {
                          type: "text",
                          label: "产品线负责人",
                          variable: "principal",
                          default: "",
                          check: {
                            type: "NOT_NULL",
                            message: "产品线负责人不能为空哦！",
                          },
                          option: {
                            placeholder: "请输入产品线负责人",
                          },
                        },
                      ],
                      default: () => [],
                    },
                  },
                  {
                    type: "block",
                    label: "合作运输公司",
                    variable: "compTransInfo",
                    check: {
                      type: "NOT_ZERO",
                      message: "合作运输公司不能为空",
                    },
                    dialogConfig: {
                      labelWidth: "100px",
                      dialogTitle: "请选择合作企业",
                      dialogWidth: "600px",
                      key: "compTransId",
                      onlyOne: true,
                      tableLabels: [
                        {
                          label: "compTransId",
                          name: "运输公司编号",
                        },
                        {
                          label: "compTransName",
                          name: "运输公司名称",
                        },
                      ],
                      labels: [
                        {
                          label: "compTransId",
                          name: "运输公司编号",
                        },
                        {
                          label: "compTransName",
                          name: "运输公司名称",
                        },
                      ],
                      default: () => [],
                      getTableData: (pageNumber, pageSize) => {
                        return this.$Http
                          .get({
                            url: "/processing/compTransInfo",
                            data: {
                              startPage: pageNumber,
                              pageSize,
                            },
                          })
                          .then((res) => {
                            return Promise.resolve({
                              curPage: res.data.curPage,
                              totalPage: res.data.totalPage,
                              data: res.data.compTransInfo,
                            });
                          });
                      },
                    },
                  },
                ],
              };
              break;
            case 2:
              companyType = "运输企业";
              this.config = {
                title: "您需要完善企业信息",
                width: "600px",
                labelWidth: "120px",
                items: [
                  {
                    type: "text",
                    label: "用户名",
                    variable: "username",
                    default: res.data.username,
                    disabled: true,
                  },
                  {
                    type: "text",
                    label: "企业类别",
                    variable: "companyType",
                    default: companyType,
                    disabled: true,
                  },
                  {
                    type: "text",
                    label: "企业名称",
                    variable: "compName",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业名称不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业名称",
                    },
                  },
                  {
                    type: "text",
                    label: "企业地址",
                    variable: "compAddr",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业地址不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业地址",
                    },
                  },
                  {
                    type: "text",
                    label: "企业电话",
                    variable: "compTel",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业电话不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业电话",
                    },
                  },
                  {
                    type: "text",
                    label: "企业负责人",
                    variable: "compPrincipal",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业负责人不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业负责人",
                    },
                  },
                  {
                    type: "block",
                    label: "合作销售公司",
                    variable: "compSaleInfo",
                    check: {
                      type: "NOT_ZERO",
                      message: "合作销售公司不能为空",
                    },
                    dialogConfig: {
                      labelWidth: "100px",
                      dialogTitle: "请选择合作企业",
                      dialogWidth: "600px",
                      key: "compSaleId",
                      onlyOne: true,
                      tableLabels: [
                        {
                          label: "compSaleId",
                          name: "销售公司编号",
                        },
                        {
                          label: "compSaleName",
                          name: "销售公司名称",
                        },
                      ],
                      labels: [
                        {
                          label: "compSaleId",
                          name: "销售公司编号",
                        },
                        {
                          label: "compSaleName",
                          name: "销售公司名称",
                        },
                      ],
                      default: () => [],
                      getTableData: (pageNumber, pageSize) => {
                        return this.$Http
                          .get({
                            url: "/transport/compSaleInfo",
                            data: {
                              startPage: pageNumber,
                              pageSize,
                            },
                          })
                          .then((res) => {
                            return Promise.resolve({
                              curPage: res.data.curPage,
                              totalPage: res.data.totalPage,
                              data: res.data.compSaleInfo,
                            });
                          });
                      },
                    },
                  },
                ],
              };
              break;
            case 3:
              companyType = "销售企业";
              this.config = {
                title: "您需要完善企业信息",
                width: "600px",
                labelWidth: "120px",
                items: [
                  {
                    type: "text",
                    label: "用户名",
                    variable: "username",
                    default: res.data.username,
                    disabled: true,
                  },
                  {
                    type: "text",
                    label: "企业类别",
                    variable: "companyType",
                    default: companyType,
                    disabled: true,
                  },
                  {
                    type: "text",
                    label: "企业名称",
                    variable: "compName",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业名称不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业名称",
                    },
                  },
                  {
                    type: "text",
                    label: "企业地址",
                    variable: "compAddr",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业地址不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业地址",
                    },
                  },
                  {
                    type: "text",
                    label: "企业电话",
                    variable: "compTel",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业电话不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业电话",
                    },
                  },
                  {
                    type: "text",
                    label: "企业负责人",
                    variable: "compPrincipal",
                    default: "",
                    check: {
                      type: "NOT_NULL",
                      message: "企业负责人不能为空哦！",
                    },
                    option: {
                      placeholder: "请输入企业负责人",
                    },
                  },
                ],
              };
              break;
          }
        });
    },
    onConfirm(formData) {
      let httpUrl = "";
      let data = {};
      let redirectUrl = "";
      switch (this.userInfo.registered) {
        case 0:
          httpUrl = "/production/completeCompInfo";
          data = {
            compName: formData.compName,
            compAddr: formData.compAddr,
            compTel: formData.compTel,
            compFields: formData.compFields,
            compProcId: formData.compProcInfo[0].compProcId,
          };
          redirectUrl = "/product/index";
          break;
        case 1:
          httpUrl = "/processing/completeCompInfo";
          data = {
            compName: formData.compName,
            compAddr: formData.compAddr,
            compTel: formData.compTel,
            compPrincipal: formData.compPrincipal,
            productLineInfo: formData.productLineInfo,
            compTransId: formData.compTransInfo[0].compTransId,
          };
          redirectUrl = "/process/index";
          break;
        case 2:
          httpUrl = "/transport/completeCompInfo";
          data = {
            compName: formData.compName,
            compAddr: formData.compAddr,
            compTel: formData.compTel,
            compPrincipal: formData.compPrincipal,
            compTransId: formData.compSaleInfo[0].compSaleId,
          };
          redirectUrl = "/transport/index";
          break;
        case 3:
          httpUrl = "/sales/completeCompInfo";
          data = {
            compName: formData.compName,
            compAddr: formData.compAddr,
            compTel: formData.compTel,
            compPrincipal: formData.compPrincipal,
          };
          redirectUrl = "/sale/index";
          break;
      }
      this.$Http
        .post({
          url: httpUrl,
          data,
        })
        .then(() => {
          this.$message.success("成功完善信息");
          this.$router.replace(redirectUrl);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.compelete-company-info {
}
</style>
