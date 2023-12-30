import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element的所有组件
import ElementUI from 'element-ui';

// 组件库的样式文件
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/reset.css'
import dataV from '@jiaminghi/data-view'


Vue.config.productionTip = false
// 把element-ui提供的所有组件都变成项目的全局组件（直接用）
Vue.use(ElementUI)

Vue.use(dataV)
// 添加 Message 到 Vue 的原型链上以便在组件内部可以通过 this.$message 访问
Vue.prototype.$message = ElementUI.Message;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
