<template>
  <ScrollBar>
    <div class="transport-index">
      <Breadcrumb :config="{ data: { title: '首页数据统计' } }"></Breadcrumb>
      <el-row :gutter="30" class="cards">
        <el-col :xl="8" :lg="8" :md="8" :sm="24"
          ><RotateBlock
            title="已运输的运单总数"
            :number="indexData.transportedNum"
            :customStyle="{ 'background-color': '#d9544f' }"
          ></RotateBlock>
        </el-col>
        <el-col :xl="8" :lg="8" :md="8" :sm="24"
          ><RotateBlock
            title="运输中的运单总数"
            :number="indexData.transportingNum"
            :customStyle="{ 'background-color': '#418bca' }"
          ></RotateBlock>
        </el-col>
        <el-col :xl="8" :lg="8" :md="8" :sm="24"
          ><RotateBlock
            title="今日总运单数"
            :number="indexData.sumTransport"
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
            <h4>正在生产中的田块</h4>
            <div class="tian-container" style="height:500px">
              <ScrollBar color="rgba(255,255,255,0.5)">
                <div
                  v-for="item in indexData.transportingProduction"
                  :key="item.finishedProductName"
                  class="tian"
                >
                  <span>{{ item.finishedProductName }}</span>
                  <span>{{ item.waybillSource }}</span>
                  <span>{{ item.waybillTo }}</span>
                </div>
              </ScrollBar>
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
export default {
  name: "TransportIndex",
  components: {
    Breadcrumb,
    ScrollBar,
    RotateBlock,
    EchartsView,
  },
  data() {
    return {
      indexData: {
        transportedNum: 0, //成功运输的运单总数
        transportingNum: 0, //运输中的运单总数
        sumTransport: 0, //今天的运单总数
        announcement: "", //公告
        completedMonth: [], //最近一个月每天完成的数量
        transportingProduction: [
          //正在运输中的产品
        ],
      },
      graphLoading: false,
      echartsConfig: {
        title: {
          text: "近一个月每日完成产品数量",
          textStyle: {
            color: "white",
          },
        },
        grid: {
          right: 10,
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            dataZoom: {},
            magicType: {
              type: ["line", "bar", "tiled"],
            },
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
        series: [
          {
            type: "bar",
            animationDelay: function(idx) {
              return idx * 10;
            },
            itemStyle: {
              color: "#ffffff80",
            },
            emphasis: {
              itemStyle: {
                color: "#ffffff",
                shadowColor: "white",
                shadowBlur: 10,
              },
            },
          },
        ],
        dataset: {
          source: [],
        },
        animationEasing: "elasticOut",
        animationDelayUpdate: function(idx) {
          return idx * 5;
        },
        textStyle: {
          color: "white",
        },
      },
    };
  },
  mounted() {
    this.getIndexData();
  },
  methods: {
    getIndexData() {
      const loadingIns = this.$loading({
        text: "正在加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)",
      });
      this.$Http
        .get({
          url: "/transport/index",
        })
        .then((res) => {
          this.indexData = res.data;
          const echartsData = [];
          res.data.completedMonth.forEach((v) => {
            const data = Object.entries(v)[0];
            data[1] = Number(data[1]);
            data[0] = data[0].slice(5);
            echartsData.push(data);
          });
          this.echartsConfig.dataset.source = echartsData;
        })
        .finally(() => {
          loadingIns.close();
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.transport-index {
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
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
      text-align: left;
      h4 {
        font-size: 18px;
        color: white;
        padding: 15px;
      }
      .tian-container {
        display: flex;
        .tian {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: space-between;
          padding: 4px 10px;
          margin: 10px 15px;
          span:nth-child(2) {
            width: 50%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
