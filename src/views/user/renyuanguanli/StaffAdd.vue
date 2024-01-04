<template>
  <div class="register-page">
    <div class="register-form-container">
      <el-card class="register-card">
        <div slot="header" class="card-header">工作人员账户注册</div>
        <el-form :model="form" :rules="rules" ref="form" label-width="120px" label-position="right">
          <el-form-item label="登录账号" prop="account">
            <el-input v-model="form.account" placeholder="请输入登录账号"></el-input>
          </el-form-item>

          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value=1></el-option>
              <el-option label="女" value=0></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader" action="http://localhost:3000/file" :show-file-list="false"
              :on-success="success">
              <!-- 上传成功了就显示图片 -->
              <img v-if="form.avatar" :src="form.avatar" class="avatar">
              <!-- 上传之前就显示加号 -->
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item class="form-actions">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button type="default" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    var checkConfirmPassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        return callback(new Error('两次输入的密码不一致'));
      }
      callback();
    };
    return {
      form: {
        account: '',
        name: '',
        password: '',
        confirmPassword: '',
        sex: '',
        age: null,
        address: '',
        phone: '',
        avatar: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 6, max: 15, message: '登录账号长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: checkConfirmPassword, trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    //图片上传成功
    success(res) {
      //console.log(res)
      this.form.avatar = res.data;
    },
    //重置
    resetForm() {
      if (this.$refs.form) {
        this.$refs.form.resetFields();
        this.form.avatar = '';
      }
    },
    //新增
    async submitForm() {
      console.log(this.form);
      try {
        const response = await axios.post('http://localhost:3000/staffAdd', this.form);
        if (response.data.code === 1) {
          console.log(response);
          this.$message.success(response.data.msg || '添加成功');
          this.resetForm();
        } else {
          console.log(response);
          this.$message.error(response.data.msg || '添加失败');
        }
      } catch (error) {
        if (error.response) {
          // 后端返回了错误响应（状态码不是 2xx）
          const errorMsg = error.response.data && error.response.data.msg
            ? error.response.data.msg
            : '添加失败';
          this.$message.error(errorMsg);
        } else {
          // 没有响应（网络或其他错误）
          this.$message.error('网络错误');
        }
      }
    }

  }
}
  ;
</script>
  
<style scoped>
.register-page {
  background-color: #87CEEB;
  /* 天蓝色背景 */
  min-height: 100vh;
  /* 确保整个视口都被背景覆盖 */
  padding: 20px;
  /* 添加一些内边距 */
}

.register-form-container {
  max-width: 600px;
  margin: 0 auto;
  /* 在水平方向上居中 */
  background-color: #fff;
  /* 表单的背景色为白色 */
  padding: 20px;
  /* 添加一些内边距 */
  border-radius: 8px;
  /* 轻微的圆角 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.register-card {
  border: 1px solid #ebeef5;
  border-radius: 8px;
}

.card-header {
  font-size: 18px;
  color: #303133;
}

.form-actions {
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>