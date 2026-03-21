<template>
  <div class="login-page">
    <el-card class="el-card">
      <template #header>面经运营后台</template>
      <!-- Form -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名: " prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码: " prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item class="tc">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginIndex",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
          { min: 5, max: 11, message: "长度需为 5~11 位" },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
          { pattern: /^\w{5,12}$/, message: "长度需为 5~12 位" },
        ],
      },
    };
  },
  methods: {
    async login() {
      // 1. 登陆时先校验
      const myForm = this.$refs.form;
      try {
        await myForm.validate();
        // 2. 通过则调用 vuex 中的 action
        await this.$store.dispatch("user/loginAction", this.form);
        // 3. 成功提示 + 跳转首页
        this.$message.success("登陆成功");
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    reset() {
      // 重制表单
      const myForm = this.$refs.form;
      myForm.resetFields();
    },
  },
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
