<template>
  <ScrollBar>
    <div class="com-manage">
      <Breadcrumb
        :config="{
          data: { title: '企业信息管理', subTitle: '企业管理' },
        }"
      ></Breadcrumb>
      <CompStatus :values="dataValues" :onOperation="onOperation"></CompStatus>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import CompStatus from "@/components/admin/CompStatus.vue";
export default {
  name: "ComManage",
  components: {
    Breadcrumb,
    ScrollBar,
    CompStatus,
  },
  data() {
    return {
      dataValues: [],
    };
  },
  created() {
    this.getCompInfo();
  },
  methods: {
    onOperation() {
      this.getCompInfo();
    },
    getCompInfo() {
      const values = [];
      const requests = [];
      requests.push(
        this.$Http
          .get({
            url: "/admin/prodEi",
          })
          .then((res) => {
            values.push({
              type: 0,
              labels: [
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
                  label: "compFields",
                  name: "田块信息",
                },
              ],
              ...res.data,
            });
          })
      );
      requests.push(
        this.$Http
          .get({
            url: "/admin/procEi",
          })
          .then((res) => {
            values.push({
              type: 1,
              labels: [
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
              ...res.data,
            });
          })
      );
      requests.push(
        this.$Http
          .get({
            url: "/admin/transEi",
          })
          .then((res) => {
            values.push({
              type: 2,
              labels: [
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
              ...res.data,
            });
          })
      );
      requests.push(
        this.$Http
          .get({
            url: "/admin/saleEi",
          })
          .then((res) => {
            values.push({
              type: 3,
              labels: [
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
              ...res.data,
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
.com-manage {
  padding: 20px;
}
</style>
