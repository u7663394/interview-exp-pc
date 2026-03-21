// 封装请求模块
import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";

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
    // 统一处理错误提示
    if (error.response) {
      Message.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

// 4. 导出实例
export default request;
