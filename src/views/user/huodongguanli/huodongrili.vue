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
            <li v-for="event in getEvents(date)" :key="event.id" class="event-item" @click="showEventDetail(event)"
              :title="event.activityname">
              {{ event.activityname | truncate }}
            </li>
          </ul>
        </div>
      </template>


    </el-calendar>
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose" class="event-details-dialog">
      <h2 class="event-title">{{ currentEvent.name }}</h2>
      <p class="event-time">{{ formatDateTime(currentEvent.time) }}</p>
      <p class="event-location">{{ currentEvent.location }}</p>
      <p class="event-type">{{ currentEvent.activityType }}</p>
      <p class="event-status">{{ currentEvent.status }}</p>
      <p class="event-staff">负责人: {{ currentEvent.staffName }}</p>
      <div>
        <h3>参加名单</h3>
        <ul> 
          <template v-if="participantList.length > 0">
            <li v-for="participant in participantList" :key="participant.general.id">
              姓名：{{ participant.general.name }} - 电话：{{ participant.general.phone }}
            </li>
          </template>
          <li v-else>还没有人报名参加</li>
        </ul>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      value: new Date(), // 当前选中的日期
      tableData: [
      ],
      participantList: [], // 存储参加名单的数据
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
  filters: {
    truncate(value) {
      if (!value || typeof value !== 'string') {
        return ''; // 如果value是undefined或者不是字符串，则返回空字符串
      }
      const length = 10; // 活动名称的最大显示长度
      if (value.length > length) {
        return value.substring(0, length) + '...'; // 如果超出长度，截断并添加省略号
      }
      return value;
    }
  },

  methods: {
    formatDateTime(dateTime) {
      return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
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
    // 获取参加活动的名单
    async fetchParticipantList(activityId) {
      try {
        const response = await axios.get('http://localhost:3000/obtainTheListOfParticipantsInTheEvent', {
          params: { activityId: activityId }
        });
        if (response.data && response.data.code === 1) {
          this.participantList = response.data.data.list; // 将名单数据赋值给participantList
        } else {
          throw new Error(response.data.msg || '获取名单失败');
        }
      } catch (error) {
        console.error('Error fetching participant list:', error);
        this.participantList = []; // 出错时重置参加名单
      }
    },
    async showEventDetail(event) {
      this.currentEvent = {
        ...event, // 复制所有已有的活动信息
        staffName: event.staff ? event.staff.name : '无', // 添加负责人的名字，若无负责人则设为'无'
      };
      // 调用获取参加名单的方法，传递活动ID
      await this.fetchParticipantList(this.currentEvent.id);
      this.dialogVisible = true; // 显示活动详情弹框
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    async getactivity() {
      let res = await axios({
        url: 'http://localhost:3000/wxGetactivityList',
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
.event-details-dialog {
  /* 弹框基础样式 */
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.event-title {
  /* 标题样式 */
  color: #007bff;
  font-size: 1.5em;
  margin-bottom: 15px;
}

.event-time,
.event-location,
.event-type,
.event-status,
.event-staff {
  /* 内容样式 */
  margin: 10px 0;
  font-size: 1.1em;
  line-height: 1.4;
}

/* 鼠标悬停在弹框上时的效果 */
.event-details-dialog:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.event-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.event-item {
  background-color: #409eff;
  color: white;
  padding: 3px 6px;
  margin: 2px 0;
  border-radius: 4px;
  font-size: 80%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
  display: block;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: darken(#409eff, 10%);
    transform: scale(1.1);
  }
}

/* 悬停在活动名称上时的工具提示样式 */
.event-item[title]:hover:after {
  content: attr(title);
  position: absolute;
  background: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 20;
}

.cell {
  border: 1px solid #ebebeb;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
}
</style>
