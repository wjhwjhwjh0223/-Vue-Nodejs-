import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//角色:管理员,工作人员,老人
// 这里定义非菜单栏的路由
const commonRoutes = [

  {
    path: '/service-details',
    name: 'ServiceDetails',
    component: ()=>import('@/views/user/fuwuguanli/ServiceDetails.vue')
  },
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
    meta: { title: '首页', menu: true, icon: 'el-icon-s-platform' ,role:['userLogin','generalLogin','staffLogin']},
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
    meta: { title: '用户管理', icon: 'el-icon-user-solid' ,role:['userLogin']},
    children: [
      {
        path:'/user/generallist',
        meta:{title:'老人列表'},
        component:()=>import('@/views/user/renyuanguanli/GeneralList')
      },
      {
        path: '/user/generaladd',
        meta: { title: '老人添加',  },
        // @符号就是src的别名
        component: () => import('@/views/user/renyuanguanli/GeneralAdd.vue')
      },
      {
        path: '/user/stafflist',
        meta: { title: '员工列表',  },
        component: () => import('@/views/user/renyuanguanli/StaffList.vue')
      },
      {
        path: '/user/staffadd',
        meta: { title: '员工添加',  },
        component: () => import('@/views/user/renyuanguanli/StaffAdd.vue')
      },
      {
        path:'/user/mimaxiugai',
        meta: { title: '密码修改',  },
        component: () => import('@/views/user/renyuanguanli/mimaxiugai.vue')
      }
      // {
      //   path:'/user/gerenzhongxin',
      //   meta: { title: '个人中心',  },
      //   component: () => import('@/views/user/renyuanguanli/gerenzhongxin.vue')
      // }
    ]
  },
  //服务管理模块
  {
    path: '/fuwuguanli',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '服务管理', icon: 'el-icon-phone' ,role:['userLogin']},
    children: [{
      path:'/fuwuguanli/fuwushenhe',
      meta: { title: '服务审核',  },
      component: () => import('@/views/user/fuwuguanli/fuwushenhe.vue')
    },
    {
      path:'/fuwuguanli/fuwuliebiao',
      meta: { title: '服务列表',  },
      component: () => import('@/views/user/fuwuguanli/fuwuliebiao.vue')
    }
    ]
  },
  //紧急事件模块
  {
    path: '/user/jinjishijian',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '紧急事件', menu:true, icon: 'el-icon-warning',role:['userLogin'] },
    children: [{
      path:'',
      meta: { title: '事件列表', menu:true },
      component: () => import('@/views/user/jinjishijian/shijianliebiao.vue')
    }
  ]
  },
  //活动管理模块
  {
    path: '/huodongguanli',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '活动管理', icon: 'el-icon-s-flag' ,role:['userLogin']},
    children:[{
      path:'/huodongguanli/huodongliebiao',
      meta: { title: '活动日历',  },
      component: () => import('@/views/user/huodongguanli/huodongrili.vue')
    },
    {
      path: '/huodongguanli/huodongshenhe',
      meta: { title: '活动审核',  },
      component: () => import('@/views/user/huodongguanli/huodongshenhe.vue')
    }
  ]
  },
  //工作人员个人信息模块
  {
    path:'/staff',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '个人信息', icon: 'el-icon-user-solid',role:['staffLogin'] },
    children:[{
      path:'/staff/gerenxinxi',
      meta: { title: '个人信息',  },
      component: () => import('@/views/staff/gerenzhongxin/gerenxinxi.vue')
    },
    {
      path:'/staff/gerenxinxi/xiugaimima',
      meta: { title: '修改密码',  },
      component: () => import('@/views/staff/gerenzhongxin/xiugaimima.vue')
    }]
  }
  //工作人员预约服务模块
  ,
  {
    path:'/fuwuguanli',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '服务管理', icon: 'el-icon-s-help',role:['staffLogin'] },
    children:[{
      path:'/staff/yuyuefuwu',
      meta: { title: '预约服务',  },
      component: () => import('@/views/staff/fuwuguanli/yuyuefuwu.vue')
    },
    {
      path:'/staff/wodefuwu',
      meta: { title: '我的服务',  },
      component: () => import('@/views/staff/fuwuguanli/wodefuwu.vue')
    },
    {
      path:'/staff/wodefuwupingjia',
      meta: { title: '我的服务评价',  },
      component: () => import('@/views/staff/fuwuguanli/wodefuwupingjia.vue')
    }]
  }
  ,
  //工作人员紧急事件模块
  {
    path: '/staff/jinjishijian',
    component: () => import('@/layout/Layout.vue'),
    meta: { title: '紧急事件', icon: 'el-icon-warning', role: ['staffLogin'] },
    children: [
      {
        path: '',
        meta: { title: '我参与的紧急事件', menu: true ,},
        component: () => import('@/views/staff/jinjishijian/wodejinjishijian.vue')
       
      }
    ]
  },
  //工作人员活动模块
  {
    path:'/huodongzhongxing',
    component: () => import('@/layout/Layout.vue'),
    meta:{title:'活动中心',icon:'el-icon-s-promotion',role:['staffLogin']},
    children:[{
      path:'/staff/chuangjianhuodong',
      meta: { title: '创建活动',  },
      component: () => import('@/views/staff/huodongzhongxing/chuangjianhuodong.vue')
    },
    {
      path:'/staff/huodongliebiao',
      meta: { title: '活动列表'},
      component: () => import('@/views/staff/huodongzhongxing/huodongliebiao.vue')
    },]
  },
  //老人信息模块
  {
    path:'/general/gerenzhongxin',
    component: () => import('@/layout/Layout.vue'),
    meta:{title:'个人中心',icon:'el-icon-user-solid',role:['generalLogin']},
    children:[{
      path:'/general/gerenzhongxin/wodexinxi',
      meta: { title: '个人信息'},
      component: () => import('@/views/general/gerenzhongxin/wodexinxi.vue'),
    },
    {
      path:'/general/gerenzhongxin/mimaxiugai',
      meta: { title: '密码修改'},
      component: () => import('@/views/general/gerenzhongxin/mimaxiugai.vue')
    }]
  },
  //老人服务模块
  {
    path:'general/yuyuefuwu',
    component: () => import('@/layout/Layout.vue'),
    meta:{title:'预约服务',icon:'el-icon-s-order',role:['generalLogin']},
    children:[{
      path:'/general/yuyuefuwu/shenqingyuyue',
      meta: { title: '申请预约'},
      component: () => import('@/views/general/yuyuefuwu/shenqingyuyue.vue')
    },
    {
      path:'/general/yuyuefuwu/yuyueguanli',
      meta: { title: '预约管理'},
      component: () => import('@/views/general/yuyuefuwu/yuyueguanli.vue')
    }]  
  },
  //老人紧急救助模块
  {
    path:'general/jinjiqiuzhu',
    component: () => import('@/layout/Layout.vue'),
    meta:{title:'紧急求助',icon:'el-icon-phone-outline',role:['generalLogin']},
    children:[{
      path:'/general/jinjiqiuzhu/faqijiuzhu',
      meta: { title: '发起求助'},
      component: () => import('@/views/general/jinjiqiuzhu/faqiqiuzhu.vue')
    },
    {
      path:'/general/jinjiqiuzhu/jinjiguanli',
      meta: { title: '求助管理'},
      component: () => import('@/views/general/jinjiqiuzhu/qiuzhuguanli.vue')
    }]
  },
  {
    path:'general/huodongzhongxin',
    component: () => import('@/layout/Layout.vue'),
    meta:{title:'活动中心',icon:'el-icon-s-promotion',role:['generalLogin']},
    children:[{
      path:'/general/huodongzhongxin/huodongliebiao',
      meta: { title: '活动列表'},
      component: () => import('@/views/general/huodongzhongxin/huodongliebiao.vue')
    },
    {
      path:'/general/huodongzhongxin/huodongguanli',
      meta: { title: '活动管理'},
      component: () => import('@/views/general/huodongzhongxin/huodongguanli.vue')
    }]
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
