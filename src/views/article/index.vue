<template>
  <div class="article-page">
    <!-- Breadcrumb -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <!-- Header -->
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button icon="el-icon-plus" size="small" type="primary" round>
            添加面经
          </el-button>
        </div>
      </template>
      <!-- 表格部分 -->
      <el-table :data="tableData">
        <el-table-column prop="stem" label="标题" width="350"></el-table-column>
        <el-table-column prop="creator" label="作者"></el-table-column>
        <el-table-column prop="likeCount" label="点赞"></el-table-column>
        <el-table-column prop="views" label="浏览数"></el-table-column>
        <el-table-column prop="createdAt" label="更新时间"></el-table-column>
        <el-table-column label="编辑">
          <template #default="scope">
            <div class="actions">
              <i class="el-icon-view"></i>
              <i class="el-icon-edit-outline"></i>
              <i class="el-icon-delete" @click="del(scope.row.id)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="current"
        :total="total"
        layout="prev, pager, next"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from "@/api/article";

export default {
  name: "article-page",
  data() {
    return {
      tableData: [],
      current: 25,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      // 1. 发请求拿数据
      const res = await getArticleList({
        current: this.current,
        pageSize: this.pageSize,
      });
      // 2. 存数据
      this.total = res.data.total;
      this.tableData = res.data.rows;
    },
    del(id) {
      console.log(id);
    },
    // 当前页变化
    handleCurrentChange(newPage) {
      this.current = newPage;
      this.initData();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
