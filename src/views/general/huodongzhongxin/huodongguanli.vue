<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我参与的活动</span>
      </div>
      <el-table :data="userActivities" style="width: 100%">
        <el-table-column prop="name" label="活动名称"></el-table-column>
        <el-table-column prop="description" label="活动描述"></el-table-column>
        <el-table-column prop="time" label="活动时间"></el-table-column>
        <el-table-column prop="location" label="活动地点"></el-table-column>
        <el-table-column prop="status" label="活动状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewDetails(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 活动详情模态框 -->
    <el-dialog title="活动详情" :visible.sync="detailsDialogVisible" width="50%">
      <div v-if="selectedActivity">
        <p>活动名称：{{ selectedActivity.name }}</p>
        <p>活动描述：{{ selectedActivity.description }}</p>
        <p>活动类型：{{ selectedActivity.activityType }}</p>
        <p>活动时间：{{ selectedActivity.time }}</p>
        <p>活动地点：{{ selectedActivity.location }}</p>
        <p>活动状态：{{ selectedActivity.status }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="leaveActivity(selectedActivity)">退出活动</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      userActivities: [],
      detailsDialogVisible: false,
      selectedActivity: null
    };
  },
  methods: {
    viewDetails(activity) {
      this.selectedActivity = activity;
      this.detailsDialogVisible = true;
    },

    async leaveActivity(activity) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('用户未登录');
      return;
    }
    try {
      // 发送退出活动的请求
      const response = await axios.post('http://localhost:3000/activityExit', {
        generalId: userId,         // 用户ID
        activityId: activity.id    // 活动ID，从选定的活动中获取
      });

      // 根据响应结果进行处理
      if (response.data && response.data.code === 1) {
        this.$message.success('退出活动成功');
        // 从列表中移除退出的活动
        this.userActivities = this.userActivities.filter(a => a.id !== activity.id);
      } else {
        // 如果响应中的code不是1，处理错误情况
        this.$message.error('退出活动失败：' + response.data.msg);
      }
    } catch (error) {
      // 网络或其他错误
      this.$message.error('退出活动时出现错误');
    }
    // 不论成功与否，关闭模态框
    this.detailsDialogVisible = false;
  },
    //获取当前用户的活动列表
    async fetchActivityList() {
      const userId = localStorage.getItem('userId');
      try {
        let res = await axios({
          url: 'http://localhost:3000/user/activity',
          method: 'get',
          params: {
            id: userId,
          }
        });
        // 检查res.data.data是否存在，并且确保res.data.data.list是一个数组
        if (res.data.data && Array.isArray(res.data.data.list)) {
          this.userActivities = res.data.data.list.map(item => item.activity);
          console.log(this.userActivities);
        } else {
          // 如果res.data.data.list不存在或不是数组，则设置userActivities为空数组
          console.error('Expected list not found in response:', res.data);
          this.userActivities = [];
        }
      } catch (error) {
        // 如果请求失败或其他错误发生，打印错误并设置userActivities为空数组
        console.error("Error fetching activity list:", error);
        this.userActivities = [];
      }
    }


  },
  async created() {
    this.fetchActivityList()
  }
};
</script>
  
<style scoped></style>
  