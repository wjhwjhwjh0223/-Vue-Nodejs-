<template>
  <aside :style="{width: isopen ? '220px' : '64px'}">
    <el-switch
      v-model="isopen"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
    <div class="sidebar-header">
      社区养老服务平台
    </div>
    <el-menu :default-active="comCurIndex" router background-color="#304156" :collapse="!isopen">
      <!-- 插槽 -->
      <template v-for="route in activeMenuRoutes">
        
        
 <!-- 当route只有一个孩子的时候 -->
 <el-menu-item v-if="route.children.length === 1" :key="route.path" :index="route.path">
          <i :class="route.meta.icon || 'el-icon-menu'"></i>
          <span slot="title">{{ route.meta.title }}</span>
        </el-menu-item>
        <!-- 当route的孩子大于1 -->
        <el-submenu v-else :key="route.path + '-submenu'" :index="route.path">
          <template slot="title">
            <i :class=" route.meta.icon || 'el-icon-location'"></i>
            <span>{{ route.meta.title }}</span>
          </template>
          <el-menu-item v-for="child in route.children" :key="child.path" :index="child.path">{{ child.meta.title }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>

  </aside>
</template>

<script>
  import { menuRoutes } from '@/router/index'
  export default {
    data() {
      return {
        // isopen为true代表展开   isopen为false代表关闭
        // collapse为true代表收起  false代表展开
        isopen: true,
        // 当前定位项
        curIndex: '',
        menuRoutes,
        role: localStorage.getItem('role')
      }
    },
    methods: {
      handelWindowResize() {
        // 得到尺寸
        let width = document.body.offsetWidth
        if(width < 800) this.isopen = false
        else this.isopen = true
      }
    },
    created() {
      // 执行一次
      // this.curIndex = this.$route.path
    },
    // 在某一个生命周期中
    mounted() {
      // 页面加载完，不管窗口有没有发生变化，都要计算一次
      this.handelWindowResize()
      // 1. 监听窗口尺寸变化
      window.addEventListener('resize', this.handelWindowResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handelWindowResize)
    },
    computed: {
      activeMenuRoutes() {
        let role = localStorage.getItem('role')
        if(role) {
          return this.menuRoutes.filter(item => {
            return (item.meta.role || []).includes(role)
          })
        } else {
          return this.menuRoutes
        }
      },  
      // 1. 因为页面中用到了comCurIndex，所以一进页面计算属性会计算一次，然后把计算之后的值给comCurIndex
      // 2. 每次页面的切换，$route都发生变化，计算属性都会重新执行
      comCurIndex() {
        return this.$route.path
      }
    },
    watch: {
      // 一进页面执行一次$route的监听事件
      // $route: function(newVal, oldVal) {
      //   console.log('地址发生变化了')
      //   console.log(newVal.path)
      //   this.curIndex = newVal.path
      // }
      $route: {
        handler: function(route) {
          this.curIndex = route.path
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
 .sidebar-header {
    color: #fff;
    text-align: center;
    font-size: 20px;
    padding: 10px 0;
  }
  aside {
    color: #fff;
    width: 200px;
    background-color: #304156;
    transition: all .5s;
    height: 100vh;
    overflow-y: scroll;
    .el-menu {
      border-right: none;
    }
    .el-switch {
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .el-menu-item {
      color: #fff;
    }
    .switch-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    // 如果element的一些样式覆盖不了，你就在其前面加上 /deep/
    ::v-deep .el-submenu__title  {
      color: #fff;
    }
    ::v-deep .el-menu-item.is-active {
      color: #409EFF;
    }
  }
</style>