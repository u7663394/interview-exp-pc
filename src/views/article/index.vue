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
          <el-button
            @click="openDrawer('add')"
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
          >
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
              <i
                class="el-icon-view"
                @click="openDrawer('preview', scope.row.id)"
              ></i>
              <i
                class="el-icon-edit-outline"
                @click="openDrawer('edit', scope.row.id)"
              ></i>
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
    <!-- 抽屉区域 -->
    <el-drawer
      :title="drawerTitle"
      :visible.sync="isShowDrawer"
      direction="rtl"
      :before-close="handleClose"
      size="55%"
    >
      <el-form ref="form" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem" placeholder="请输入面经标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor
            @blur="$refs.form.validateField('content')"
            v-model="form.content"
          ></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { createArticle, getArticleList, removeArticle } from "@/api/article";
// 导入富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "article-page",
  data() {
    return {
      tableData: [],
      current: 25,
      pageSize: 10,
      total: 0,
      isShowDrawer: false,
      drawerType: "add",
      form: {
        stem: "",
        content: "",
      },
      rules: {
        stem: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  created() {
    this.initData();
  },
  components: {
    quillEditor,
  },
  computed: {
    drawerTitle() {
      const map = {
        add: "添加面经",
        preview: "面经预览",
        edit: "编辑面经",
      };
      return map[this.drawerType] || "标题";
    },
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
    async del(id) {
      // 1. 调用删除请求
      await removeArticle(id);
      // 2. 提示
      this.$message.success("删除成功");
      // 3. 重新渲染
      if (this.tableData.length === 1 && this.current > 1) {
        this.current--;
      }
      this.initData();
    },
    // 当前页变化
    handleCurrentChange(newPage) {
      this.current = newPage;
      this.initData();
    },
    // 打开抽屉方法
    openDrawer(type, id) {
      console.log(id);
      this.isShowDrawer = true;
      this.drawerType = type;
    },
    // 关闭抽屉前
    handleClose() {
      this.$confirm("您确认要关闭吗?")
        .then(() => {
          // 1. 确认 -> 关闭
          this.closeDrawer();
        })
        .catch(() => {
          // 2. 取消 -> 保留
        });
    },
    // 添加文章
    async submit() {
      // 1. 校验表单
      await this.$refs.form.validate();
      // 2. 请求
      await createArticle(this.form);
      // 3. 提示
      this.$message.success("添加成功");
      // 4. 关闭抽屉 + 重置表单
      this.closeDrawer();
      // 5. 重新渲染
      this.current = 1;
      this.initData();
    },
    closeDrawer() {
      this.$refs.form.resetFields();
      this.isShowDrawer = false;
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
