<template>
  <nav>
    <!-- 面包屑 -->
    <div class="nav-left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in list" :key="item.path" :to="{ path: item.path }">{{ item.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav-right">
      <el-dropdown @command="handleCommand">
      <div style="display: inline-block;">
        <img :src="userAvatar" alt="User Avatar" class="user-avatar dropdown-avatar" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="out">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    </div>
  </nav>
</template>

<script>
import { BASE_URL } from "@/utils/common";
import axios from 'axios';
export default {
  data() {
    return {
      BASE_URL,
      user: {},
      userAvatar: '',
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const role = localStorage.getItem('role');
        //console.log(role)
        let apiUrl = '/api/user/profile'; // 默认 API
        // 根据角色更改 API
        if (role === 'userLogin') {
          apiUrl = 'http://localhost:3000/user';
        } else if (role === 'staffLogin') {
          apiUrl = 'http://localhost:3000/staff/id';
        } else if (role === 'generalLogin') {
          apiUrl = 'http://localhost:3000/general/id';
        }
        const response = await axios.get(apiUrl, {
          params: {
            id: localStorage.getItem('userId')
          }
        });
        //console.log(response)
        if(role === 'userLogin'){
          this.userAvatar = response.data.data[0].avatar; // 获取头像 URL
        }else{
          this.userAvatar=response.data.data.avatar;
        }
        //console.log(this.userAvatar,'ab')
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    handleCommand(command) {
      console.log(command);
      if (command === "out") {
        localStorage.clear();
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.fetchUserData();
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
  height: 60px;
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

    .user-avatar {
      width: 50px; /* 增大头像宽度 */
      height: 50px; /* 增大头像高度 */
      border-radius: 50%; /* 保持圆形 */
      margin-right: 10px; /* 可以添加一些边距 */
    }
    img {
      border-radius: 50%;
    }
  }
}
</style>
