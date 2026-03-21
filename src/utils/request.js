// 封装请求模块
import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { delToken } from "./storage";
import router from "@/router";

// 1. 创建 axios 实例
const request = axios.create({
  baseURL: "http://interview-api-t.itheima.net/",
  timeout: 5000,
});

// 2. 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 统一携带 token
    const token = store.state.user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 3. 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // 统一处理错误
    if (error.response) {
      // 1. 处理 token 过期或被篡改
      if (error.response.status === 401) {
        Message.error("当前登陆状态过期, 请重新登陆");
        // 清除 token + 跳转登陆页
        store.commit("user/logout");
        delToken();
        router.push("/login");
      } else {
        // 2. 其余错误
        Message.error(error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

// 4. 导出实例
export default request;
