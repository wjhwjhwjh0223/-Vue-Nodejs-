<template>
  <div class="login-box">
      <div class="xjl">
          <div class="xwt">
              <div class="j"><img src="https://p6.itc.cn/q_70,c_lfill,w_372,h_216,g_face/images01/20230704/727ce84e6c6046e580bc9bf7c610cd01.jpeg" alt=""></div>
          </div>
          <div class="x">
      <div>账号： <input v-model="account" id="inpt" type="text"></div><br>
      <!-- type为password， 表示密码框-->
      <div>密码： <input v-model="password" type="password"></div><br>
      <div class="jl">
          <div><button @click="login">登录</button></div>
          <div><button>注册</button></div>
      </div>
      </div>
      <div class="wt"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        account: '123',
        password: '123'
      }
    },
    methods: {
      login() {
        console.log(`账号: ${this.account}, 密码: ${this.password}`)
        console.log(`发送给后端`)
        console.log(`得到后端结果：登陆成功`)
        console.log(`登录成功：跳转页面`)
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.login-box{
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 添加背景图片  background-image: url('') */
  background-image: url('https://uimg.huixiaoer.net/86124669/b70f06b21f95d5548b1313da56194914.jpg');
  /* 背景图片的大小  background-size: cover;   （cover）是覆盖整个元素*/
  background-size: cover;
}
.xjl{
  width: 400px;
  height: 400px;
  background-color: white;
}
.jl{
  display: flex;
  justify-content:space-between;
  margin-bottom: 10px;
}
.jl div{
  margin-left: 30px;
}
.xwt{
  width: 100%;
  height: 120px;
  background-color: aqua;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wt{
  width: 100%;
  height: 60px;
  background-color: rgb(81, 80, 79);
}
.x{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height: 220px;
}
.x input{
  /* 边框厚度为1，颜色为红色   （border 表示边框） */
  border: 1px solid red;
}
.jl button{
  top:5px;
  /* position:relative;  相对定位
      position:absolute; 绝对定位*/
  position:relative;
  margin-bottom: 5px;
  transition: all 0.3s;
}
.jl button:hover{
  background-color: red;
  top:6px
}
.xwt img{
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  transform: scale();
  transition: all 0.5s;
}
.j{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
.xwt img:hover{
  transform: scale(1.3);
}
</style>