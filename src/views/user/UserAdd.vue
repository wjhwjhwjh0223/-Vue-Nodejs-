<template>
  <div>
    <el-card>
      <div slot="header">
        用户添加
      </div>
    </el-card>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="database" :rules="rules" ref="databaseForm">
      <el-form-item label="用户ID">
        <el-input v-model="database.userId"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="database.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="database.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="database.username"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="database.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="database.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="database.age"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-input v-model="database.type"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="database.address"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="database.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.database.checkPass !== '') {
          this.$refs.databaseForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.database.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      labelPosition: 'right',
      database: {
        userId: '',
        password: '',
        checkPass:'',
        username: '',
        name: '',
        sex: '',
        age: '',
        type: '',
        address: '',
        phone: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.databaseForm.validate((valid) => {
        if (valid) {
          // 提交表单
          console.log('表单提交成功', this.database);
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
  }
 
}
</script>

<style lang="scss" scoped></style>