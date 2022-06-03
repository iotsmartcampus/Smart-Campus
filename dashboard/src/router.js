import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/views/dashboard/Index"),
      children: [
        // Dashboard
        {
          name: "Dashboard",
          path: "",
          component: () => import("@/views/dashboard/Dashboard"),
        },
        //Block
        {
          name: "Block",
          path: "/block/:id",
          component: () => import("@/views/dashboard/pages/BlockPage/Blocks"),
        },
        // Pages
        {
          name: "User Profile",
          path: "pages/user",
          component: () => import("@/views/dashboard/pages/UserProfile"),
        },
      ],
    },
  ],
});
