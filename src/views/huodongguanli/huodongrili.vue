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
              {{ event.name }}
            </li>
          </ul>
        </div>
      </template>
    </el-calendar>
    <!-- 活动详情的对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <h2>{{ currentEvent.name }}</h2>
      <p>{{ currentEvent.date }}</p>
      <p>{{ currentEvent.description }}</p>
    </el-dialog>
  </div>
</template>
  
  
<script>
export default {
  data() {
    return {
      value: new Date(), // 当前选中的日期
      // 确保这里的日期格式与 getEvents 方法生成的格式完全一致
      events: [
        { id: 1, date: '2023-12-21', name: '新年聚会' },
        { id: 2, date: '2023-01-15', name: '社区大扫除' },
      ],
      dialogVisible: false,
      currentEvent: {},
    };
  },
  methods: {
    getEvents(date) {
      // 确保日期格式化后与 events 数组中的日期格式一致
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return this.events.filter(event => event.date === dateString);
    },
    showEventDetail(event) {
      this.currentEvent = event;
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.dialogVisible = false;
    }
  },
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
  