// 文章相关API
import request from "@/utils/request";

// 1. 获取文章列表请求
export const getArticleList = (data) => {
  return request.get("/admin/interview/query", {
    params: {
      current: data.current,
      pageSize: data.pageSize,
    },
  });
};

// 2. 添加文章请求
export const createArticle = (info) => {
  return request.post("/admin/interview/create", {
    stem: info.stem,
    content: info.content,
  });
};
