<template>
    <div>
        <el-card>
            <div slot="header">
                <span>活动列表</span>
            </div>
            <el-table :data="activityList" style="width: 100%">
                <el-table-column prop="name" label="活动名称"></el-table-column>
                <el-table-column prop="description" label="活动描述"></el-table-column>
                <el-table-column prop="time" label="活动时间" :formatter="row => formatDateTime(row.time)">
                </el-table-column>
                <el-table-column prop="location" label="活动地点"></el-table-column>
                <el-table-column prop="activityType" label="活动类型"></el-table-column>
                <el-table-column prop="participantCount" label="参加人数"></el-table-column>
                <el-table-column label="负责人" :formatter="renderStaffName">
                </el-table-column>
                <el-table-column label="活动状态">
                    <template slot-scope="scope">
                        <span
                            :style="{ backgroundColor: statusColorMap[scope.row.status], color: 'white', borderRadius: '10px', padding: '3px 10px', fontSize: '0.8em' }">
                            {{ scope.row.status }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="joinActivity(scope.row)"
                            :disabled="scope.row.status !== '已同意'">
                            参加
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                :page-size="pagesize">
            </el-pagination>
        </el-card>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            // 存储活动列表
            activityList: [],
            pagenumber: 1,
            pagesize: 5,
            total: this.total,
            statusColorMap: {
                '计划中': 'blue',
                '已同意': 'green',
                '已完成': 'grey',
                '已拒绝': 'red'
            },
        };
    },
    methods: {
        //参加活动
        // 用户点击参加活动按钮时调用
    async joinActivity(activity) {
      // 从localStorage获取当前用户ID
      const userId = localStorage.getItem('userId');
      console.log(userId);
      console.log(activity.id);
      if (!userId) {
        this.$message.error('无法获取用户ID请确保已登录!');
        return;
      }
      try {
        // 调用后端接口以参加活动
        const response = await axios.post('http://localhost:3000/participate-activity', {
          userId: userId,
          activityId: activity.id
        });
        // 根据响应处理结果
        if (response.data.code === 1) {
          this.$message.success('成功参加活动！');
        } else {
          // 后端返回错误消息
          this.$message.error(response.data.msg);
        }
      } catch (error) {
        // 处理请求错误
        this.$message.error('参加活动请求失败，请稍后再试！');
      }
    },

        // 获取活动列表
    async fetchActivityList() {
        try {
            const response = await axios.get('http://localhost:3000/getactivityList');
            if (response.data.code === 1) {
                this.activityList = response.data.data.list;
               } else {
                this.$message.error('加载活动列表失败');
            }
        } catch (error) {
            console.error('请求失败:', error);
            this.$message.error('请求失败');
        }
     },
        // 渲染负责人姓名
        renderStaffName(row) {
            return row.staff ? row.staff.name : '暂无';
        }, formatDateTime(dateTime) {
            const date = new Date(dateTime);
            return new Intl.DateTimeFormat('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(date);
        },
    },
    created() {
        this.fetchActivityList(); // 组件创建时获取活动列表
    },
};
</script>
  
  

<style lang="scss" scoped></style>