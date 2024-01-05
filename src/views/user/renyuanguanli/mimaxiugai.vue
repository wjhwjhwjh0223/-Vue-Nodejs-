<template>
  <div>
    <el-card>
      <div slot="header">
        <span>密码修改</span>
      </div>

      <div style="margin: 20px;"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <!-- <el-form-item label="用户ID" prop="userId">
          <el-input v-model="ruleForm.userId" autocomplete="off" placeholder="请输入用户ID"></el-input>
        </el-form-item> -->
        <el-form-item label="旧密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass" autocomplete="new-password"
            placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkNewPass">
          <el-input type="password" v-model="ruleForm.checkNewPass" autocomplete="new-password"
            placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    const validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.checkNewPass !== '') {
          this.$refs.ruleForm.validateField('checkNewPass');
        }
        callback();
      }
    };
    const validateCheckNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入的新密码不一致'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id: '',
        password: '',
        newPass: '',
        checkNewPass: ''
      },
      rules: {
        // userId: [
        //   { required: true, message: '请输入用户ID', trigger: 'blur' }
        // ],
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPass: [
          { required: true, validator: validateNewPass, trigger: 'blur' }
        ],
        checkNewPass: [
          { required: true, validator: validateCheckNewPass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
            let response = await axios({
              method: 'post',
              url: 'http://localhost:3000/userChangePassWord',
              data: this.ruleForm
            });
            if (response.data.code === 1) {
              this.$message({ type: 'success', message: '修改成功!' });
              this.resetForm('ruleForm')
            } else {
              this.$message({ type: 'error', message: response.data.msg || '修改失败!' });
            }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.ruleForm.id = localStorage.getItem('userId')
  }
}
</script>
  
<style lang="scss" scoped>
.demo-ruleForm {
  max-width: 500px;
  margin: auto;
}
</style>
  