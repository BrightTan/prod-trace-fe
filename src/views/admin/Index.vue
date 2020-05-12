<template>
  <ScrollBar>
    <div class="admin-index">
      <Breadcrumb :config="{ data: { title: '首页数据统计' } }"></Breadcrumb>
      <el-row :gutter="30" class="cards">
        <el-col :xl="8" :lg="8" :md="8" :sm="24"
          ><RotateBlock
            title="注册企业总数"
            :number="indexData.companyNum"
            :customStyle="{ 'background-color': '#d9544f' }"
          ></RotateBlock>
        </el-col>
        <el-col :xl="8" :lg="8" :md="8" :sm="24"
          ><RotateBlock
            title="注册消费者总数"
            :number="indexData.consumerNum"
            :customStyle="{ 'background-color': '#418bca' }"
          ></RotateBlock>
        </el-col>
        <el-col :xl="8" :lg="8" :md="8" :sm="24"
          ><RotateBlock
            title="溯源码使用量"
            :number="indexData.sourceNumberNum"
            :customStyle="{ 'background-color': '#16a085' }"
          ></RotateBlock>
        </el-col>
      </el-row>
      <el-row :gutter="30" class="content">
        <el-col :xl="16" :lg="16" :md="16" :sm="24">
          <div class="left">
            <div class="graphView">
              <EchartsView
                :loading="graphLoading"
                :echartsConfig="echartsConfig"
              ></EchartsView>
            </div>
            <div class="announce">
              <h4>公告</h4>
              <p>{{ indexData.announcement }}</p>
            </div>
          </div>
        </el-col>
        <el-col :xl="8" :lg="8" :md="8" :sm="24">
          <div class="right">
            <div class="user-graph">
              <EchartsView
                :loading="graphLoading"
                :echartsConfig="userGraphConfig"
              ></EchartsView>
            </div>
            <div class="report-graph">
              <EchartsView
                :loading="graphLoading"
                :echartsConfig="reportGraphConfig"
              ></EchartsView>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import RotateBlock from "@/components/common/RotateBlock.vue";
import EchartsView from "@/components/common/EchartsView.vue";

const dateMap = {
  "01": "一月",
  "02": "二月",
  "03": "三月",
  "04": "四月",
  "05": "五月",
  "06": "六月",
  "07": "七月",
  "08": "八月",
  "09": "九月",
  "10": "十月",
  "11": "十一月",
  "12": "十二月",
};

export default {
  name: "AdminIndex",
  components: {
    Breadcrumb,
    ScrollBar,
    RotateBlock,
    EchartsView,
  },
  data() {
    return {
      indexData: {
        companyNum: 0,
        consumerNum: 0,
        sourceNumberNum: 0,
        announcement: "",
        completedMonth: [],
        compProdNum: 0,
        compProcNum: 0,
        compTransNum: 0,
        compSaleNum: 0,
        prodReport: 0, //生产者投诉数量
        procReport: 0, //加工者投诉数量
        transReport: 0, //运输者投诉数量
        saleReport: 0, //销售者投诉数量
      },
      graphLoading: false,
      echartsConfig: {
        title: {
          text: "近三个月各公司产量",
          textStyle: {
            color: "white",
          },
        },
        // grid: {
        //   right: 10,
        // },
        toolbox: {
          // y: 'bottom',
          feature: {
            dataView: {},
            saveAsImage: {
              pixelRatio: 2,
            },
          },
          iconStyle: {
            borderColor: "#ffffff80",
          },
          emphasis: {
            iconStyle: {
              borderColor: "white",
            },
          },
        },
        tooltip: {},
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 60,
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#ffffff40",
            },
          },
        },
        series: [],
        animationEasing: "elasticOut",
        animationDelayUpdate: function(idx) {
          return idx * 5;
        },
        textStyle: {
          color: "white",
        },
      },
      userGraphConfig: {
        title: {
          text: "公司占比",
          left: "center",
          top: 20,
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/> {c} <br/>占比：{d}%",
        },
        series: [],
      },
      reportGraphConfig: {
        title: {
          text: "投诉占比",
          left: "center",
          top: 20,
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/> {c} 个投诉<br/>占比：{d}%",
        },
        series: [],
      },
    };
  },
  created() {
    this.getIndexData();
  },
  methods: {
    getIndexData() {
      this.graphLoading = true;
      this.$Http
        .get({
          url: "/admin/index",
        })
        .then((res) => {
          this.indexData = res.data;
          const series = [];
          const legendData = [];
          res.data.completedMonth.forEach((item, index) => {
            const dataArr = [];
            item.outputInfo.forEach((countData) => {
              dataArr.push([countData.companyName, countData.count]);
            });
            legendData.push(dateMap[item.time.slice(5, 7)]);
            series.push({
              name: dateMap[item.time.slice(5, 7)],
              type: "scatter",
              symbol:
                index === 0 ? "circle" : index === 1 ? "diamond" : "triangle",
              symbolSize: 20,
              data: dataArr,
            });
          });
          this.echartsConfig.legend = { data: legendData };
          this.echartsConfig.series = series;
          this.userGraphConfig.series = [
            {
              name: "公司数量",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: [
                { value: res.data.compProdNum, name: "生产公司" },
                { value: res.data.compProcNum, name: "加工公司" },
                { value: res.data.compTransNum, name: "运输公司" },
                { value: res.data.compSaleNum, name: "销售公司" },
              ].sort(function(a, b) {
                return a.value - b.value;
              }),
              label: {
                color: "rgba(255, 255, 255, 0.6)",
              },
              labelLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.6)",
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
              itemStyle: {
                // color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },

              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function() {
                return Math.random() * 200;
              },
            },
          ];
          this.reportGraphConfig.series = [
            {
              name: "投诉量",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: [
                { value: res.data.prodReport, name: "生产公司" },
                { value: res.data.procReport, name: "加工公司" },
                { value: res.data.transReport, name: "运输公司" },
                { value: res.data.saleReport, name: "销售公司" },
              ].sort(function(a, b) {
                return a.value - b.value;
              }),
              label: {
                color: "rgba(255, 255, 255, 0.6)",
              },
              labelLine: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.6)",
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
              itemStyle: {
                // color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },

              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function() {
                return Math.random() * 200;
              },
            },
          ];
        })
        .finally(() => {
          this.graphLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.admin-index {
  padding: 20px;
  .cards {
    margin-top: 20px;
  }
  .content {
    .left {
      .graphView {
        height: 400px;
        border-radius: 4px;
        padding: 15px;
        background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
      }
      .announce {
        border-radius: 4px;
        padding: 15px;
        background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
        text-align: left;
        margin: 30px 0;
        h4 {
          font-size: 18px;
          color: white;
          margin-bottom: 20px;
        }
        p {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
    .right {
      & > div {
        height: 300px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
        text-align: left;
        padding: 15px;
        & + div {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
