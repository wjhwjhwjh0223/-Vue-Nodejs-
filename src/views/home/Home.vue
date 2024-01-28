<template>
  <div>
    <el-card>
      <div class="home-title" style="display: flex; justify-content: center; align-items: center;">
        欢迎来到智能社区养老服务平台
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <div class="clearfix">
              <span class="card-label">注册用户</span>
              <span class="card-number">{{ userCount }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div class="clearfix">
              <span class="card-label">工作人员</span>
              <span class="card-number">{{ staffCount }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" style="height: 400px;">
          <v-chart :options="chartOptions" ref="myChart" />
        </el-col>
        <el-col :span="12" style="height: 400px;">
          <v-chart :options="pieChartOptions" ref="pieChart" />
        </el-col>
      </el-row>
      <div class="chat-wrapper">
        <!-- 消息列表 -->
        <div class="chat-header">社区老年服务交流</div>
        <div class="chat-container">
          <div v-for="msg in msgList" :class="{ 'my-message': msg.type === 0, 'received-message': msg.type === 1 }">
            <p>{{ msg.name }}: {{ msg.msg }}</p>
          </div>
        </div>
        <!-- 发送消息 -->
        <div>
          <el-input v-model="msg"></el-input>
          <el-button @click="submit">发送！</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
// 导入客户端的socket.io
import axios from 'axios';
import VChart from 'vue-echarts';
import socketIo from "socket.io-client";
export default {
  components: {
    'v-chart': VChart
  },
  data() {
    return {
      genderDistribution: [],
      name: localStorage.getItem("name"),
      userId: localStorage.getItem("userId"),
      io: "",
      msg: "",
      msgList: [],
      userCount: 0,
      staffCount: 0,
      chartOptions: {
        // ECharts 配置项
      },
      pieChartOptions: {}, // 用于饼图的配置
    };
  },
  methods: {
    async fetchGeneralData() {
      try {
        const response = await axios.get('http://localhost:3000/allGeneral');
        const generalData = response.data.data;
        this.userCount = generalData.length; // 设置员工数量
        this.setPieChartOptions(generalData);
        // 处理其他数据，例如设置userCount或staffCount
      } catch (error) {
        console.error('Error fetching general data:', error);
      }
    },
    setPieChartOptions(generalData) {
      const genderData = this.processGenderData(generalData);
      console.log(genderData)
      this.genderDistribution = genderData;
      this.pieChartOptions = {
        tooltip: {},
        // legend: {
        //   data: ['老年用户性别分布'],
        // },
        series: [{
          name: '老年用户性别分布',
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          data: this.genderDistribution,
        }],
        graphic: {
          type: 'text',
          left: 'center', // 水平居中
          bottom: 10, // 底部位置，10像素的偏移
          style: {
            text: '老人用户性别分布',
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#333' // 文本颜色
          }
        },
      };
      this.$nextTick(() => {
        if (this.$refs.pieChart && typeof this.$refs.pieChart.setOption === 'function') {
          this.$refs.pieChart.setOption(this.pieChartOptions, true);
        }
      });
    },
    processGenderData(data) {
      console.log('11111111111', data)
      let maleCount = 0;
      let femaleCount = 0;
      data.forEach(item => {
        if (item.sex === 1) {
          maleCount += 1;
        } else if (item.sex === 0) {
          femaleCount += 1;
        }
      });
      // 确保至少返回包含男性和女性数量的对象数组
      return [
        { value: maleCount, name: '男性' },
        { value: femaleCount, name: '女性' }
      ];
    },

    setChartOptions(staffData) {
      //console.log("staffData:", staffData); 
      this.chartOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        xAxis: {
          type: 'category',
          data: staffData.map(staff => staff.name), // 使用员工姓名作为X轴数据
          axisLabel: {
            interval: 0, // 强制显示所有标签
          },
        },
        yAxis: {
          type: 'value',
          name: '年龄', // Y轴名称
          nameLocation: 'end', // 名称位置，默认即在末端
          nameTextStyle: { // 名称的样式设置
            color: '#333',
            fontSize: 14,
            padding: [0, 0, 0, 20] // 调整Y轴名称与轴线的距离
          },
        },
        graphic: {
          type: 'text',
          left: 'center', // 水平居中
          bottom: 10, // 底部位置，10像素的偏移
          style: {
            text: '工作人员年龄信息', // 要显示的文本内容
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#333' // 文本颜色
          }
        },
        series: [{
          data: staffData.map(staff => staff.age), // 使用员工年龄作为Y轴数据
          type: 'bar'
        }]
      };
      this.$nextTick(() => {
        if (this.$refs.myChart && typeof this.$refs.myChart.setOption === 'function') {
          this.$refs.myChart.setOption(this.chartOptions, true);
        }
      });
    },
    async fetchData() {
      await axios.get('http://localhost:3000/staffList').then(response => {
        const staffData = response.data.data;
        this.staffCount = staffData.length; // 设置员工数量
        this.setChartOptions(staffData); // 设置柱状图
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    // 连接聊天服务
    connect() {
      // 本地的地址
      // const url = 'http://localhost:3001'
      const url = "http://127.0.0.1:3001";
      // 返回一个客户端的socket对象
      this.io = socketIo(url, {
        // get传参的形式
        query: `name=${this.name}`,
      });

      // 监听其他用户进入群聊
      this.io.on("count", (data) => {
        console.log(data);
      });

      // 某人发了消息
      this.io.on("msg", (data) => {
        this.msgList.push(data);
      });
    },
    submit() {
      this.msgList.push({
        name: this.name,
        type: 0,
        msg: this.msg,
      });
      this.io.emit("msg", this.msg); 
      this.msg = '';
    },
  },
  created() {
    // 连接聊天服务器
    this.connect();
    // this.fetchData();
  },
  mounted() {
    Promise.all([this.fetchData(), this.fetchGeneralData()]).then(() => {
      this.$nextTick(() => {
        if (this.$refs.myChart) {
          this.setChartOptions(this.staffCount); // 确保此处传递的是正确的数据
          this.$refs.myChart.setOption(this.chartOptions, true);
        }
        if (this.$refs.pieChart) {
          this.setPieChartOptions(this.genderDistribution); // 确保此处传递的是正确的数据
          this.$refs.pieChart.setOption(this.pieChartOptions, true);
        }
      });
    });
  },


};
</script>

<style lang="scss" scoped>
.home-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.card-label {
  float: left;
  font-size: 1.4em;
  color: #888;
}

.card-number {
  float: right;
  font-size: 2.4em;
  font-weight: bold;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

.my-message {
  float: right;
  /* 把自己的消息放到右边 */
  clear: both;
  background-color: #DCF8C6;
  /* 微信通常使用的浅绿色作为消息气泡的背景色 */
  /* 其他样式，比如 padding, border-radius 等 */
}

.received-message {
  float: left;
  /* 把收到的消息放到左边 */
  clear: both;
  background-color: #FFF;
  /* 通常收到的消息是白色背景 */
  /* 其他样式，比如 padding, border-radius 等 */

  .chat-wrapper {
    border: 1px solid #ccc;
    /* 边框 */
    width: 100%;
    /* 宽度，根据需要调整 */
    height: 100%;
    /* 高度，根据需要调整 */
    margin: 0 auto;
    /* 居中 */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
  }

  .chat-header {
    background-color: #f3f3f3;
    /* 背景色 */
    padding: 10px;
    /* 内边距 */
    text-align: center;
    /* 标题居中 */
    font-weight: bold;
    /* 字体加粗 */
  }

  .chat-container {
    padding: 10px;
    /* 消息容器内边距 */
    height: calc(100% - 40px);
    /* 减去标题和输入框的高度 */
    overflow-y: scroll;
    /* 滚动条 */
  }

  .chat-wrapper {
    border: 1px solid #ccc;
    width: 100%;
    height: calc(100% - 40px);
    /* 假设40px为聊天输入框的高度 */
    margin: 0 auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    .chat-header {
      background-color: #f3f3f3;
      padding: 10px;
      text-align: center;
      font-weight: bold;
    }

    .chat-container {
      padding: 10px;
      height: calc(100% - 40px);
      /* 同上 */
      overflow-y: scroll;

      .my-message,
      .received-message {
        clear: both;
        padding: 10px;
        /* 消息气泡的内边距 */
        border-radius: 5px;
        /* 添加消息气泡圆角 */

        &.my-message {
          float: right;
          background-color: #DCF8C6;
        }

        &.received-message {
          float: left;
          background-color: #FFF;
        }
      }
    }
  }
}

.chat-header {
  display: flex;
  /* 使用Flex布局 */
  justify-content: center;
  /* 横向居中 */
  align-items: center;
  /* 纵向居中 */
  background-color: #f3f3f3;
  padding: 10px;
  font-size: 20px;
  /* 调整字体大小为20px或根据需要自定义 */
  font-weight: bold;
}</style>