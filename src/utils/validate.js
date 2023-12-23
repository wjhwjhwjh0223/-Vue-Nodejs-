// 表单的自定义校验函数
import { checkoldpwdReq } from '@/api/account.api';
export const checkOldPwd = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('旧密码不能空'));
  }
  // 旧密码是否正确
  // 1. 如果正确： callback()
  // 2. 如果不正确： callback(new Error('请输入数字值'))
  checkoldpwdReq(value).then(res => {
    if(res.data.code === 0) callback()
    else callback(new Error('旧密码错误！'))
  })
};


export const validatePass = function(rule, value, callback){
  // （普通函数）动态变化的
  // 只有函数执行的时候this才能确定
  // 谁调用指向谁？
  // 1. 没人调用指向window/undefined(严格模式) 
  // 2. obj.validatePass (隐式绑定)
  // 3. call, applay, bind 执行手动改变函数的this指向（这种方式的优先级比obj.validatePass）（显是绑定，强绑定）
  // 4. new 绑定 对象 = new 函数（）， this就是执行创建出来的这个对象
  console.log(this)
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    // 如果确认密码的input有值，然后对确认密码框进行校验
    debugger
    if (this.ruleForm.checkPass !== '') {
      this.$refs.ruleForm.validateField('checkPass');
    }
    callback();
  }
};

let obj = {
  name: 'xx',
  validatePass: function() {}
}
let obj2 = {}
obj.validatePass.call(obj2)







export const validatePass2 = function(rule, value, callback) {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== this.ruleForm.pass) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};