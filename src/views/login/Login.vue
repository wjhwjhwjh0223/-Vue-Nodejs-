<template>
  <div class="login-wrapper">
    <div class="login-form">
      <h2 class="login-title">社区养老服务平台</h2>
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
        <el-form-item>
          <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
          <img :src="captchaUrl" @click="getCaptcha" />
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
        captcha: "", // 添加验证码初始值
      },
      captchaUrl: 'http://localhost:3000/captcha' // 初始验证码URL
    };
  },
  methods: {
    getCaptcha() {
      this.captchaUrl = 'http://localhost:3000/captcha?' + Date.now();
    },
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
          captcha: this.form.captcha // 验证码字段
        },
        {
          withCredentials: true // 允许携带跨域cookie
        }
        );
        if (loginRes.data.code == 1) {
          localStorage.setItem("userId", loginRes.data.data.id);
          localStorage.setItem("name", loginRes.data.data.name);
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

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .login-form {
    width: 90%;
  }
}

@media screen and (max-width: 480px) {
  .login-form {
    width: 100%;
    padding: 20px;
  }
}

.el-button {
  background-color: #4a5568;
  border-color: #4a5568;
  &:hover,
  &:focus {
    background-color: #2d3a4b;
    border-color: #2d3a4b;
  }
}

.el-form-item {
  margin-top: 20px; // 增加表单项的上边距
}

.login-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://img.99ppt.com/pic/ca2aa4be-2d42-45f4-90f3-561da4056df6.png');
  background-size: cover; // 确保图片覆盖整个区域
  background-position: center; // 图片居中显示
}

img.captcha {
  cursor: pointer;
  border: 1px solid #ddd;
  margin-top: 10px;
  border-radius: 4px;
}

.login-form {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-title {
  margin: 20px;
  margin-bottom: 30px; // 增加底部边距
  font-weight: 700;
  font-size: 22px;
  color: #fff;
}
  .el-form {
    width: 100%;
  }
}

::v-deep .el-input__inner {
  background-color: rgba(45, 58, 75, 0.8); // 半透明背景
  border: 1px solid #4a5568; // 边框颜色
  color: #ffffff; // 字体颜色
}

::v-deep .el-input__icon {
  color: #a0aec0; // 图标颜色
}

</style>
