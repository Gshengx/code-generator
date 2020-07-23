import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "inputModel",
    component: () =>
      import(/* webpackChunkName: "generator" */ "../views/InputModel.vue"),
  },
  {
    path: "/uploadModel",
    name: "uploadModel",
    component: () =>
      import(/* webpackChunkName: "generator" */ "../views/UploadModel.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
