import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// 这里定义非菜单栏的路由
const commonRoutes = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  // 统计页面
  {
    path: '/statistics',
    component: () => import('@/views/statistics/Statistics.vue')
  }
]
// 这里定义菜单栏的路由
export const menuRoutes = [
  // 首页
  {
    path: '/home',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '首页', menu: true, icon: 'el-icon-s-platform' },
    children: [
      {
        // 等价于取父亲的path
        path: '',
        meta: { title: '首页', menu: true },
        component: () => import('@/views/home/Home.vue')

      }
    ]
  },

  // 商品功能模块
  {
    path: '/user',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '用户管理', icon: 'el-icon-s-goods' },
    children: [
      {
        path: '/user/list',
        meta: { title: '用户列表',  },
        // @符号就是src的别名
        component: () => import('@/views/user/UserList.vue')
      },
      {
        path: '/user/add',
        meta: { title: '用户添加',  },
        // @符号就是src的别名
        component: () => import('@/views/user/UserAdd.vue')
      },
    ]
  }


]

const router = new VueRouter({
  routes: [
    ...commonRoutes,
    ...menuRoutes,
    {
      path: '/*',
      component: () => import('@/views/error/error.vue')
    }
  ]
})


export default router
