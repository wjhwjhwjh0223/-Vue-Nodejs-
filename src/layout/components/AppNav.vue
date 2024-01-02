<template>
  <nav>
    <!-- 面包屑 -->
    <div class="nav-left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="item in list"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="nav-right">
      <el-dropdown @command="handleCommand">
        <i class="el-icon-user-solid icon-avatar"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="out">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
     
    </div>
  </nav>
</template>

<script>
import { BASE_URL } from "@/utils/common";
export default {
  data() {
    return {
      BASE_URL,
      user: {},
    };
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      if (command === "out") {
        localStorage.clear();
        this.$router.push("/login");
      }
    },
  },
  // $route有关，$route变换然后重新生成面包屑，
  computed: {
    // 是一个属性： this.list
    list() {
      return this.$route.matched.filter((item) => item.meta.title);
    },
  },
};
</script>

<style lang="less" scoped>
nav {
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  flex-shrink: 0;
  .nav-right {
    display: flex;
    align-items: center;
    .icon-avatar {
      font-size: 20px;
      &:hover {
        cursor: pointer;
      }
    }
    img {
      border-radius: 50%;
    }
  }
}
</style>
