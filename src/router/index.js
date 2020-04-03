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
    component: () => import("@/views/ChangePassword.vue"),
    children: [
      {
        path: "auth",
        component: () => import("@/components/changePassword/AuthMail.vue")
      },
      {
        path: "change",
        component: () => import("@/components/changePassword/Change.vue")
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
