<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的活动</span>
        </div>
        <el-table :data="userActivities" style="width: 100%">
          <el-table-column prop="name" label="活动名称"></el-table-column>
          <el-table-column prop="description" label="活动描述"></el-table-column>
          <el-table-column prop="time" label="活动时间"></el-table-column>
          <el-table-column prop="location" label="活动地点"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewDetails(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userActivities: []
      };
    },
    methods: {
      viewDetails(activity) {
        // 实现查看活动详情的逻辑
        // 可能需要调用router.push或者modal来展示活动详情
      },
      fetchUserActivities() {
        // 这里应该是一个API调用，获取用户参与的活动列表
        // 假设API返回的数据格式和您的活动列表格式相同
        // axios.get('/api/user/activities').then(response => {
        //   this.userActivities = response.data;
        // });
      }
    },
    created() {
      this.fetchUserActivities();
    }
  };
  </script>
  
  <style scoped>
  /* 根据需要添加CSS样式 */
  </style>
  