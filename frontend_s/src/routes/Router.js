/* eslint-disable */

import Vue from "vue";
import VueRouter from "vue-router";
import paths from "./path";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes: paths,
});


router.afterEach((to, from) => {
  //NProgress.done();
});

router.beforeEach((to, from, next) => {
  //NProgress.start()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next("/login");
      return;
    }
  }
  next();
});

export default router;
