// 用户相关API
import request from "@/utils/request";

// 1. 登陆请求
export const login = (form) => {
  return request.post("/auth/login", {
    username: form.username,
    password: form.password,
  });
};
