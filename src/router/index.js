import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Layout from "@/views/layout";
import Dashboard from "@/views/dashboard";
import Article from "@/views/article";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/login", component: Login },
    {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      children: [
        { path: "/dashboard", component: Dashboard },
        { path: "/article", component: Article },
      ],
    },
  ],
});

export default router;
