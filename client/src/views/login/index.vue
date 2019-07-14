<template>
  <div class="login-page">
    <div class="login-panel">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-renderer :content="formContent" ref="form">
        <el-form-item>
          <el-button class="login-button" type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form-renderer>
    </div>
  </div>
</template>

<script>
import { login } from "@/http/api";
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      formContent: [
        {
          type: "input",
          id: "username",
          el: {
            placeholder: "请输入用户名",
            "prefix-icon": "el-icon-user-solid"
          },
          rules: [
            {
              required: true,
              message: "用户名不能为空",
              triggle: "blur"
            }
          ]
        },
        {
          type: "input",
          id: "password",
          el: {
            placeholder: "请输入密码",
            type: "password",
            "prefix-icon": "el-icon-lock"
          },
          rules: [
            {
              required: true,
              message: "密码不能为空",
              triggle: "blur"
            }
          ]
        }
      ]
    };
  },
  computed: {
    form() {
      return this.$refs.form;
    }
  },
  methods: {
    ...mapState("user", ["update"]),
    handleSubmit() {
      this.form.validate(error => {
        if (!error) return;

        login(this.form.getFormValue()).then(({ payload }) => {
          this.update({
            userInfo: payload
          });
          this.$message.success("登录成功");
          setTimeout(() => {
            this.$router.push("/article");
          }, 500);
        });
      });
    }
  }
};
</script>

<style lang="scss">
.login-page {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background: #2d3a4b;
  .login-panel {
    width: 400px;
    margin: 160px auto;
    .title-container {
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      line-height: 80px;
      text-align: center;
    }
    .login-button {
      width: 400px;
    }
  }
}
</style>
