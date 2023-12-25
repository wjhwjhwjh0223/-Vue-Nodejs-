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
      <h2>{{ currentEvent.activityname }}</h2>
      <p>{{ currentEvent.date }}</p>
      <p>{{ currentEvent.address }}</p>
      <p>{{ currentEvent.activitytype }}</p>
      <p>{{ currentEvent.activitystatus }}</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(), // 当前选中的日期
      tableData: [
        {
          
          date: '2023-12-25',
          activityname: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          activitytype: '美食/餐厅线上活动',
          activitystatus: '进行中'
        }, {
          
          date: '2023-12-26',
          activityname: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          activitytype: '美食/餐厅线上活动',
          activitystatus: '待审核'
        }, {
          
          date: '2016-05-03',
          activityname: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          activitytype: '美食/餐厅线上活动',
          activitystatus: '已完成'
        }, {
          
          date: '2016-05-03',
          activityname: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          activitytype: '美食/餐厅线上活动',
          activitystatus: '待审核'
        }, {
          
          date: '2016-05-03',
          activityname: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          activitytype: '美食/餐厅线上活动',
          activitystatus: '待审核'
        }, {
          
          date: '2016-05-03',
          activityname: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          activitytype: '美食/餐厅线上活动',
          activitystatus: '待审核'
        }, {
          
          date: '2016-05-03',
          activityname: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          activitytype: '美食/餐厅线上活动',
          activitystatus: '待审核'
        }
      ],
      dialogVisible: false,
      currentEvent: {},
    };
  },
  methods: {
    getEvents(date) {
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return this.tableData.filter(event => event.date === dateString);
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