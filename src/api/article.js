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

// 3. 删除文章请求
export const removeArticle = (id) => {
  return request.delete("/admin/interview/remove", {
    // 请求体 body 传参 -> data
    data: { id },
  });
};

// 4. 获取文章内容请求
export const showArticle = (id) => {
  return request.get("/admin/interview/show", {
    // 查询参数 query 传参 -> params
    params: { id },
  });
};

// 5. 修改文章内容请求
export const updateArticle = (info) => {
  return request.put("/admin/interview/update", {
    id: info.id,
    stem: info.stem,
    content: info.content,
  });
};
