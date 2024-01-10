<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我参与的活动</span>
      </div>
      <el-table :data="userActivities" style="width: 100%">
        <el-table-column prop="name" label="活动名称"></el-table-column>
        <el-table-column prop="description" label="活动描述"></el-table-column>
        <el-table-column prop="time" label="活动时间">
          <template slot-scope="scope">
            {{ formatDate(scope.row.time) }}
          </template>
        </el-table-column>
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
      <el-descriptions v-if="selectedActivity" border :column="1">
        <el-descriptions-item label="活动名称">{{ selectedActivity.name }}</el-descriptions-item>
        <el-descriptions-item label="活动描述">{{ selectedActivity.description }}</el-descriptions-item>
        <el-descriptions-item label="活动类型">{{ selectedActivity.activityType }}</el-descriptions-item>
        <el-descriptions-item label="活动时间">{{ formatDate(selectedActivity.time) }}</el-descriptions-item>
        <el-descriptions-item label="活动地点">{{ selectedActivity.location }}</el-descriptions-item>
        <el-descriptions-item label="活动状态">{{ selectedActivity.status }}</el-descriptions-item>
         <!-- 参加名单的展示 -->
        <el-descriptions-item label="参与人员"> <div>
          <ul>
            <template v-if="participantList.length > 0">
              <li v-for="participant in participantList" :key="participant.general.id">
                姓名：{{ participant.general.name }} - 电话：{{ participant.general.phone }}
              </li>
            </template>
            <li v-else>还没有人报名参加</li>
          </ul>
        </div>
      </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false">关闭</el-button>
        <el-button type="danger" @click="leaveActivity(selectedActivity)">退出活动</el-button>
      </span>
    </el-dialog>

  </div>
</template>
  
<script>
import axios from 'axios';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      userActivities: [],
      detailsDialogVisible: false,
      selectedActivity: null,
      participantList: [], // 存储参加名单的数据
    };
  },
  methods: {
    async fetchParticipantList(activityId) {
      try {
        const response = await axios.get('http://localhost:3000/obtainTheListOfParticipantsInTheEvent', {
          params: { activityId: activityId }
        });
        if (response.data && response.data.code === 1) {
          this.participantList = response.data.data.list; // 将名单数据赋值给participantList
          console.log('Participant list:', this.participantList);
        } else {
          throw new Error(response.data.msg || '获取名单失败');
        }
      } catch (error) {
        console.error('Error fetching participant list:', error);
        this.participantList = []; // 出错时重置参加名单
      }
    },
    async viewDetails(activity) {
      this.selectedActivity = activity;
      console.log(activity.id)
      await this.fetchParticipantList(activity.id); // 修改这里，传入活动ID
      this.detailsDialogVisible = true;
    },
    formatDate(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
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
  