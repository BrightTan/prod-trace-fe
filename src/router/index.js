import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/regist",
    component: () => import("@/views/Regist.vue")
  },
  {
    path: "/changePassword",
    component: () => import("@/views/ChangePassword.vue")
  },
  {
    path: "/product",
    component: () => import("@/views/framework/product.vue"),
    children: [
      {
        path: "index",
        component: () => import("@/views/product/Index.vue")
      },
      {
        path: "seedsManage",
        component: () => import("@/views/product/SeedsManage.vue")
      },
      {
        path: "productInfo",
        component: () => import("@/views/product/ProductInfo.vue")
      },
      {
        path: "finishProduct",
        component: () => import("@/views/product/FinishProduct.vue")
      },
      {
        path: "finishedProductInfo",
        component: () => import("@/views/product/FinishedProductInfo.vue")
      },
      {
        path: "personalProfile",
        component: () => import("@/views/PersonalProfile.vue")
      },
      {
        path: "manageComInfo",
        component: () => import("@/views/product/ManageComInfo.vue")
      }
    ]
  },
  {
    path: "/process",
    component: () => import("@/views/framework/process.vue"),
    children: [
      {
        path: "index",
        component: () => import("@/views/process/Index.vue")
      },
      {
        path: "processWays",
        component: () => import("@/views/process/ProcessWays.vue")
      },
      {
        path: "productInfo",
        component: () => import("@/views/process/ProductInfo.vue")
      },
      {
        path: "finishProcess",
        component: () => import("@/views/process/FinishProcess.vue")
      },
      {
        path: "finishedProductInfo",
        component: () => import("@/views/process/FinishedProductInfo.vue")
      },
      {
        path: "personalProfile",
        component: () => import("@/views/PersonalProfile.vue")
      },
      {
        path: "manageComInfo",
        component: () => import("@/views/process/ManageComInfo.vue")
      }
    ]
  },
  {
    path: "/transport",
    component: () => import("@/views/framework/transport.vue"),
    children: [
      {
        path: "index",
        component: () => import("@/views/transport/Index.vue")
      },
      {
        path: "transportProductInfo",
        component: () => import("@/views/transport/TransportProductInfo.vue")
      },
      {
        path: "finishTransport",
        component: () => import("@/views/transport/FinishTransport.vue")
      },
      {
        path: "finishedProductInfo",
        component: () => import("@/views/transport/FinishedProductInfo.vue")
      },
      {
        path: "personalProfile",
        component: () => import("@/views/PersonalProfile.vue")
      },
      {
        path: "manageComInfo",
        component: () => import("@/views/transport/ManageComInfo.vue")
      }
    ]
  },
  {
    path: "/sale",
    component: () => import("@/views/framework/sale.vue"),
    children: [
      {
        path: "index",
        component: () => import("@/views/sale/Index.vue")
      },
      {
        path: "productSaleInfo",
        component: () => import("@/views/sale/ProductSaleInfo.vue")
      },
      {
        path: "finishSale",
        component: () => import("@/views/sale/FinishSale.vue")
      },
      {
        path: "buildQRCode",
        component: () => import("@/views/sale/BuildQRCode.vue")
      },
      {
        path: "personalProfile",
        component: () => import("@/views/PersonalProfile.vue")
      },
      {
        path: "manageComInfo",
        component: () => import("@/views/sale/ManageComInfo.vue")
      }
    ]
  },
  {
    path: "/admin",
    component: () => import("@/views/framework/admin.vue"),
    children: [
      {
        path: "index",
        component: () => import("@/views/admin/Index.vue")
      },
      {
        path: "announce",
        component: () => import("@/views/admin/Announce.vue")
      },
      {
        path: "ajugeComInfo",
        component: () => import("@/views/admin/AjugeComInfo.vue")
      },
      {
        path: "comManage",
        component: () => import("@/views/admin/ComManage.vue")
      },
      {
        path: "productInfo",
        component: () => import("@/views/admin/ProductInfo.vue")
      },
      {
        path: "comReport",
        component: () => import("@/views/admin/ComReport.vue")
      },
      {
        path: "personalProfile",
        component: () => import("@/views/PersonalProfile.vue")
      }
    ]
  },
  {
    path: "*",
    component: () => import("@/views/404.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
