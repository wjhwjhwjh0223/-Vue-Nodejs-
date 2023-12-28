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

  // 用户功能模块
  {
    path: '/user',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '用户管理', icon: 'el-icon-user-solid' },
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
      {
        path:'/user/mimaxiugai',
        meta: { title: '密码修改',  },
        component: () => import('@/views/user/mimaxiugai.vue')
      },{
        path:'/user/gerenzhongxin',
        meta: { title: '个人中心',  },
        component: () => import('@/views/user/gerenzhongxin.vue')
      },{
        path:'/user/UserTest',
        meta: { title: '用户测试',  },
        component: () => import('@/views/user/UserTest.vue')
      }
    ]
  },
  //服务管理模块
  {
    path: '/fuwuguanli',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '服务管理', icon: 'el-icon-phone' },
    children: [{
      path:'/fuwuguanli/fuwushenhe',
      meta: { title: '服务审核',  },
      component: () => import('@/views/fuwuguanli/fuwushenhe.vue')
    },
    {
      path:'/fuwuguanli/fuwuzhuangtai',
      meta: { title: '服务状态',  },
      component: () => import('@/views/fuwuguanli/fuwuzhuangtai.vue')
    }
    ]
  },
  //紧急事件模块
  {
    path: '/jinjishijian',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '紧急事件', icon: 'el-icon-warning' },
    children: [{
      path:'/jinjishijian/shijianliebiao',
      meta: { title: '事件列表',  },
      component: () => import('@/views/jinjishijian/shijianliebiao.vue')
    },{
      path:'/jinjishijian/renyuanfenpei',
      meta: { title: '人员分配',  },
      component: () => import('@/views/jinjishijian/renyuanfenpei.vue')
    }
  ]
  },
  //活动管理模块
  {
    path: '/huodongguanli',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '活动管理', icon: 'el-icon-s-flag' },
    children:[{
      path:'/huodongguanli/huodongliebiao',
      meta: { title: '活动日历',  },
      component: () => import('@/views/huodongguanli/huodongrili.vue')
    },
    {
      path: '/huodongguanli/huodongshenhe',
      meta: { title: '活动审核',  },
      component: () => import('@/views/huodongguanli/huodongshenhe.vue')
    }
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
