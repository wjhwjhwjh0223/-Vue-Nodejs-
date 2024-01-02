<template>
  <div class="not-found">
    <h1 class="animate-title">404</h1>
    <p class="animate-text">抱歉，您访问的页面不存在。</p>
    <router-link to="/home" class="animate-button">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
  margin-top: 100px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.not-found h1 {
  font-size: 150px;
  margin-bottom: 20px;
  animation: fadeInDown 1s ease-in-out;
}

.not-found {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中内容 */
  align-items: center; /* 水平居中内容 */
  min-height: 100vh; 
  margin: 0;
  padding: 0; 
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

.not-found a {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  animation: fadeIn 1s ease-in-out;
}

.not-found a:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
