import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Layout from "@/views/layout";
import Dashboard from "@/views/dashboard";
import Article from "@/views/article";
import store from "@/store";

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

// 首页访问拦截
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  // 1. 有 token 就放行
  const token = store.state.user.token;
  if (token) return next();
  // 2. 去白名单也放行
  if (whiteList.includes(to.path)) return next();
  // 3. 否则，拦截到登陆页
  return next("/login");
});

export default router;
