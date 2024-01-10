<template>
  <div class="login-wrapper">
    <div class="login-form">
      <h2 class="login-title">系统登录</h2>
      <!-- 表单的容器 -->
      <el-form ref="ruleform">
        <!-- 表单项 账号 -->
        <el-form-item>
          <!-- 该表单项的内容 -->
          <el-input suffix-icon="icon-yonghu iconfont" prefix-icon="el-icon-search" placeholder="请输入账号"
            v-model="form.account"></el-input>
        </el-form-item>
        <!-- 表单项 密码 -->
        <el-form-item>
          <el-input type="password" placeholder="请输入密码" v-model="form.password">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-form-item>
        <!-- 表单项 角色 -->
        <el-form-item>
          <el-select v-model="form.role">
            <el-option label="管理员" value="userLogin"></el-option>
            <el-option label="工作人员" value="staffLogin"></el-option>
            <el-option label="用户" value="generalLogin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" style="width: 100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
export default {
  data() {
    return {
      form: {
        account: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    clickEyes() {
      this.showPwd = !this.showPwd;
    },
    // 提交表单 async
    async submit() {
      let apiPath = '';
      switch (this.form.role) {
        case 'userLogin':
          apiPath = 'http://localhost:3000/userLogin';
          break;
        case 'staffLogin':
          apiPath = 'http://localhost:3000/staffLogin';
          break;
        case 'generalLogin':
          apiPath = 'http://localhost:3000/generalLogin';
          break;
        default:
          Message.error('请选择角色');
          return;
      }

      try {
        const loginRes = await axios.post(apiPath, {
          account: this.form.account,
          password: this.form.password,
        });
        if (loginRes.data.code == 1) {
          localStorage.setItem("userId", loginRes.data.data.id);
          localStorage.setItem("role", this.form.role);
          this.$router.push('/home');
        } else {
          Message.error(loginRes.data.msg || '登录失败');
        }
      } catch (error) {
        Message.error('登录请求失败');
        console.error('登录错误:', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>.login-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('D:\\goge dowlowde\\9e619171-b40e-458c-833d-7736637306fd.webp'); 
  background-size: cover; // 确保图片覆盖整个区域
  background-position: center; // 图片居中显示
}

  .login-form {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .login-title {
      margin: 20px;
      font-weight: 700;
      font-size: 22px;
      color: #fff;
    }

    .el-form {
      width: 100%;
    }
  }

  ::v-deep .el-input__inner {
    background-color: #2d3a4b;
  }

  ::v-deep .el-input input {
    color: #fff;
  }

</style>
