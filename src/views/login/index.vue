<template>
  <div class="login-page">
    <el-card class="el-card">
      <template #header>面经运营后台</template>
      <el-form>
        <el-form-item label="用户名: ">
          <el-input placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码: ">
          <el-input placeholder="请输入密码" />
        </el-form-item>
        <el-form-item class="tc">
          <el-button type="primary">登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginIndex",
};
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header {
      height: 80px;
      background: rgba(114, 124, 245, 1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>
