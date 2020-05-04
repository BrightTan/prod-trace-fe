<template>
  <el-container class="product-layout">
    <el-aside :class="{ collapse: collapseMenu }">
      <ScrollBar :size="4" color="rgba(0,0,0,0.2)">
        <div>
          <el-header style="height: 45px">
            <div v-if="!collapseMenu">
              <img :src="require('@/assets/minimal-logo.png')" alt="logo" />
              <span>农产品溯源管理系统</span>
            </div>
            <i
              :class="{
                'el-icon-s-fold': !collapseMenu,
                'el-icon-s-unfold': collapseMenu,
              }"
              style="cursor:pointer"
              @click="changeMenuCollepse"
            ></i>
          </el-header>
          <el-menu
            :default-active="$router.currentRoute.path"
            :default-openeds="['1', '2']"
            :router="true"
            :collapse="collapseMenu"
          >
            <el-menu-item index="/product/index"
              ><i class="el-icon-document"></i>
              <span slot="title">首页</span></el-menu-item
            >
            <el-submenu index="1" popper-class="layout-menu-popper">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">产品信息管理</span>
              </template>
              <el-menu-item index="/product/seedsManage">
                <i class="el-icon-document"></i>
                <span slot="title">种子管理</span></el-menu-item
              >
              <el-menu-item index="/product/productInfo">
                <i class="el-icon-document"></i>
                <span slot="title">产品生产信息</span></el-menu-item
              >
              <el-menu-item index="/product/finishProduct">
                <i class="el-icon-document"></i>
                <span slot="title">完成产品生产</span></el-menu-item
              >
              <el-menu-item index="/product/finishedProductInfo">
                <i class="el-icon-document"></i>
                <span slot="title">已完成产品信息</span></el-menu-item
              >
            </el-submenu>
            <el-submenu index="2" popper-class="layout-menu-popper">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">用户信息管理</span>
              </template>
              <el-menu-item index="/product/personalProfile">
                <i class="el-icon-document"></i>
                <span slot="title">个人信息管理</span></el-menu-item
              >
              <el-menu-item index="/product/manageComInfo">
                <i class="el-icon-document"></i>
                <span slot="title">企业信息管理</span></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </div>
      </ScrollBar>
    </el-aside>
    <el-container>
      <el-header
        class="header"
        style="height: 45px;background-color:rgba(0, 0, 0, 0.1)"
      >
        <el-avatar
          shape="square"
          :size="45"
          src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        ></el-avatar>
        <div class="user">Administrator</div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "ProductFramework",
  components: { ScrollBar },
  data() {
    return {
      collapseMenu: false,
    };
  },
  methods: {
    changeMenuCollepse() {
      this.collapseMenu = !this.collapseMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-layout {
  width: 100%;
  height: 100%;
  .el-aside {
    width: 250px !important;
    &.collapse {
      width: 40px !important;
      .el-header {
        justify-content: center;
      }
    }
    .el-header {
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.15);
      color: white;
      div {
        height: 100%;
        display: flex;
        font-size: 18px;
        align-items: center;
        font-weight: bold;
        span {
          margin-left: 10px;
        }
      }
      i {
        font-size: 22px;
      }
    }
    .el-menu,
    & /deep/ .el-menu {
      border: none;
      background-color: transparent;
      &.el-menu--collapse {
        width: 40px !important;
        .el-submenu__title {
          display: flex;
          justify-content: center;
        }
        .el-menu-item {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .el-submenu__title {
        height: 45px;
        line-height: 45px;
      }
      .el-submenu {
        background-color: rgba(0, 0, 0, 0.05);
        &.is-opened {
          background-color: transparent;
          .el-submenu__title {
            background-color: transparent;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          }
        }
        .el-submenu__title {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
      .el-submenu__title {
        box-sizing: border-box;
        padding: 0 8px !important;
        text-align: left;
        color: rgba(0, 0, 0, 0.3);
        font-weight: bold;
        i {
          color: rgba(0, 0, 0, 0.3);
          line-height: 45px;
        }
        & /deep/ .el-submenu__icon-arrow {
          top: 0;
          margin-top: 0;
        }
      }
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        padding: 0 8px !important;
        box-sizing: border-box;
        text-align: left;
        margin-top: 1px;
        color: white;
        &:hover {
          background-color: transparent;
        }
        &:hover::before {
          width: 250px;
        }
        &.is-active {
          background-color: rgba(0, 0, 0, 0.2) !important;
          &::before {
            width: 0;
          }
        }
        &::before {
          display: block;
          width: 0;
          height: 100%;
          content: " ";
          position: absolute;
          left: 0px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0) 100%
          );
          transition: width linear 0.2s;
        }
        .el-tooltip {
          display: flex !important;
          justify-content: center;
        }
        i {
          color: white;
          line-height: 40px;
        }
      }
    }
  }
  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .user {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 10px;
      color: white;
      font-weight: bold;
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
  .el-main {
    padding: 0;
  }
}
</style>

<style lang="scss" global>
.layout-menu-popper {
  background-color: rgba(0, 0, 0, 0.5);
  .el-menu {
    background-color: transparent;
  }
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    color: white;
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}
.el-tooltip__popper {
  background-color: rgba(0, 0, 0, 0.4) !important;
  .popper__arrow {
    border-right-color: transparent !important;
  }
  .popper__arrow::after {
    border-right-color: rgba(0, 0, 0, 0.4) !important;
  }
}
</style>
