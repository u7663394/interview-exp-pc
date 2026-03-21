// User 相关 Vuex 模块
import { login } from "@/api/user";
import { getToken, setToken } from "@/utils/storage";

export default {
  namespaced: true,
  state() {
    return {
      token: getToken() || "",
    };
  },
  mutations: {
    serUserToken(state, newToken) {
      // 1. 存入 vuex
      state.token = newToken;
      // 2. 存入 localStorage
      setToken(newToken);
    },
    logout(state) {
      state.token = "";
    },
  },
  actions: {
    async loginAction(context, form) {
      // 1. 发送登陆请求
      const res = await login(form);
      // 2. 调用 mutation 存 token
      context.commit("serUserToken", res.data.token);
    },
  },
  getters: {},
};
