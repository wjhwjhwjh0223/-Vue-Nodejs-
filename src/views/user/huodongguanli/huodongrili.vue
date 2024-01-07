<template>
  <div>
    <el-card>
      <template #header>
        <span>活动日历</span>
      </template>
    </el-card>
    <el-calendar v-model="value" :first-day-of-week="1">
      <template v-slot:dateCell="{ date }">
        <div class="cell">
          <span>{{ date.getDate() }}</span>
          <ul class="event-list">
            <li v-for="event in getEvents(date)" :key="event.id" class="event-item" @click="showEventDetail(event)">
              {{ event.activityname }}
            </li>
          </ul>
        </div>
      </template>
    </el-calendar>
    <!-- 活动详情的对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <h2>{{ currentEvent.name }}</h2>
      <p>{{ currentEvent.time }}</p>
      <p>{{ currentEvent.location }}</p>
      <p>{{ currentEvent.activityType }}</p>
      <p>{{ currentEvent.status }}</p>
      <p>负责人: {{ currentEvent.staffName }}</p>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      value: new Date(), // 当前选中的日期
      tableData: [
      ],
      dialogVisible: false,
      currentEvent: {
        name: '',
        time: '',
        location: '',
        activityType: '',
        status: '',
        staffName: '', // 添加负责人名称属性
      },
    };
  },
  methods: {
    getEvents(date) {
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      //console.log(date)
      return this.tableData.filter(event => {
        // 首先检查 event 是否存在
        if (!event) {
          console.warn('Event object is missing:', event);
          return false;
        }
        // 然后检查 event.date 是否存在
        if (!event.time) {
          console.warn('Event date property is missing:', event);
          return false;
        }
        // 接着检查 event.date 是否可以转换为合法的日期对象
        const eventDateObj = new Date(event.time);
        if (isNaN(eventDateObj.getTime())) {
          console.warn('Event date is not a valid date:', event);
          return false;
        }
        // 最后将事件的日期时间转换为 YYYY-MM-DD 格式
        const eventDate = eventDateObj.toISOString().split('T')[0];
        return eventDate === dateString;
      });
    },
    showEventDetail(event) {
      this.currentEvent = {
        ...event, // 复制所有已有的活动信息
        staffName: event.staff ? event.staff.name : '无', // 添加负责人的名字，若无负责人则设为'无'
      };
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    async getactivity() {
      let res = await axios({
        url: 'http://localhost:3000/getactivityList',
        method: 'get',
      })
      console.log(res, '---------------')
      this.tableData = res.data.data.list
      console.log(this.tableData)
    }
  },
  async created() {
    this.getactivity()
  }
};
</script>

<style scoped>
.el-calendar .cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.event-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.event-item {
  background-color: #409eff;
  /* Element UI 主题蓝色 */
  color: white;
  padding: 3px 6px;
  margin: 2px 0;
  border-radius: 4px;
  font-size: 80%;
  text-align: center;
}
</style>