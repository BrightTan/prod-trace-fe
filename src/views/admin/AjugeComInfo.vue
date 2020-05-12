<template>
  <ScrollBar>
    <div class="ajuge-com-info">
      <Breadcrumb
        :config="{
          data: { title: '企业信息管理', subTitle: '企业信息更改审核' },
        }"
      ></Breadcrumb>
      <CompInfoModify :values="dataValues" :onOperation="onOperation"></CompInfoModify>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import CompInfoModify from "@/components/admin/CompInfoModify.vue";
export default {
  name: "AjugeComInfo",
  components: {
    Breadcrumb,
    ScrollBar,
    CompInfoModify,
  },
  data() {
    return {
      dataValues: [],
    };
  },
  created() {
    this.getCompModify();
  },
  methods: {
    onOperation() {
      this.getCompModify();
    },
    getCompModify() {
      const values = [];
      const requests = [];
      requests.push(
        this.$Http
          .get({
            url: "/admin/auditProd",
          })
          .then((res) => {
            res.data.prodEi.forEach((item) => {
              values.push({
                type: 0,
                labels: [
                  {
                    label: "username",
                    name: "用户名",
                  },
                  {
                    label: "compNumber",
                    name: "企业编号",
                  },
                  {
                    label: "compName",
                    name: "企业名称",
                  },
                  {
                    label: "compAddr",
                    name: "企业地址",
                  },
                  {
                    label: "compTel",
                    name: "企业电话",
                  },
                  {
                    label: "compProcName",
                    name: "合作加工公司",
                  },
                  {
                    label: "fieldInfo",
                    name: "田块信息",
                  },
                ],
                oldData: item.oldData,
                newData: item.newData,
              });
            });
          })
      );
      requests.push(
        this.$Http
          .get({
            url: "/admin/auditProc",
          })
          .then((res) => {
            res.data.procEi.forEach((item) => {
              values.push({
                type: 1,
                labels: [
                  {
                    label: "username",
                    name: "用户名",
                  },
                  {
                    label: "compNumber",
                    name: "企业编号",
                  },
                  {
                    label: "compName",
                    name: "企业名称",
                  },
                  {
                    label: "compAddr",
                    name: "企业地址",
                  },
                  {
                    label: "compTel",
                    name: "企业电话",
                  },
                  {
                    label: "compPrincipal",
                    name: "企业负责人",
                  },
                  {
                    label: "permitNo",
                    name: "企业许可编号",
                  },
                  {
                    label: "compTransName",
                    name: "合作运输公司",
                  },
                  {
                    label: "productLineInfo",
                    name: "生产线信息",
                  },
                ],
                oldData: item.oldData,
                newData: item.newData,
              });
            });
          })
      );
      requests.push(
        this.$Http
          .get({
            url: "/admin/auditTrans",
          })
          .then((res) => {
            res.data.transEi.forEach((item) => {
              values.push({
                type: 2,
                labels: [
                  {
                    label: "username",
                    name: "用户名",
                  },
                  {
                    label: "compNumber",
                    name: "企业编号",
                  },
                  {
                    label: "compName",
                    name: "企业名称",
                  },
                  {
                    label: "compAddr",
                    name: "企业地址",
                  },
                  {
                    label: "compTel",
                    name: "企业电话",
                  },
                  {
                    label: "compPrincipal",
                    name: "企业负责人",
                  },
                  {
                    label: "compSaleName",
                    name: "合作销售公司",
                  },
                ],
                oldData: item.oldData,
                newData: item.newData,
              });
            });
          })
      );
      requests.push(
        this.$Http
          .get({
            url: "/admin/auditSale",
          })
          .then((res) => {
            res.data.saleEi.forEach((item) => {
              values.push({
                type: 3,
                labels: [
                  {
                    label: "username",
                    name: "用户名",
                  },
                  {
                    label: "compNumber",
                    name: "企业编号",
                  },
                  {
                    label: "compName",
                    name: "企业名称",
                  },
                  {
                    label: "compAddr",
                    name: "企业地址",
                  },
                  {
                    label: "compTel",
                    name: "企业电话",
                  },
                  {
                    label: "compPrincipal",
                    name: "企业负责人",
                  },
                ],
                oldData: item.oldData,
                newData: item.newData,
              });
            });
          })
      );
      Promise.all(requests).then(() => {
        this.dataValues = values;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ajuge-com-info {
  padding: 20px;
}
</style>
