// 封装本地存储模块
const KEY = "my-token-element-pc";

// 1. 获取 token
export const getToken = () => {
  return localStorage.getItem(KEY);
};

// 2. 设置 token
export const setToken = (newToken) => {
  localStorage.setItem(KEY, newToken);
};

// 3. 删除 token
export const delToken = () => {
  localStorage.removeItem(KEY);
};
