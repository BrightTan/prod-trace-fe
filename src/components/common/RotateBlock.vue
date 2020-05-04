<template>
  <div class="rotate-block">
    <div class="front" :style="{ ...customStyle }">
      <i :class="[logo]"></i>
      <div class="data">
        <div class="title">{{ title }}</div>
        <span>{{ count }}</span>
      </div>
    </div>
    <div class="back">
      <i class="el-icon-s-data"></i>
      <div>查看详情</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RotateBlock",
  props: {
    customStyle: {
      type: Object,
      default: () => ({
        "background-color": "blue",
        color: "white",
      }),
    },
    title: {
      type: String,
      default: "标题",
    },
    number: {
      type: Number,
      default: 3541,
    },
    logo: {
      type: String,
      default: "el-icon-edit",
    },
  },
  computed: {
    count: function() {
      const headAndGroups = this.number
        .toString()
        .match(/^([0-9]{1,3})(([0-9]{3})*)$/)
        .slice(1, -1);
      if (headAndGroups[1] === "") {
        return headAndGroups[0];
      }
      const groups = [headAndGroups[0]];
      for (let i = 0; i < headAndGroups[1].length; i += 3) {
        groups.push(headAndGroups[1].substr(i, 3));
      }
      return groups.join(",");
    },
  },
};
</script>
<style lang="scss" scoped>
.rotate-block {
  position: relative;
  perspective: 600px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    .front {
      transform: rotateY(180deg);
    }
    .back {
      transform: rotateY(0);
    }
  }
  .front {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    transform: rotateY(0);
    position: relative;
    z-index: 2;
    transition: transform ease-in-out 0.4s;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    color: white;
    i {
      font-size: 60px;
    }
    .data {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      div {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.5);
      }
      span {
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    transform: rotateY(-179deg);
    transform-style: preserve-3d;
    background-color: #fff;
    transition: transform ease-in-out 0.4s;
    backface-visibility: hidden;
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &:hover {
      color: #418bca;
    }
    i {
      font-size: 60px;
    }
  }
}
</style>
