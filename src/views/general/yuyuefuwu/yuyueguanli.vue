<template>
    <div>
        <el-card>
            <div slot="header">
                <span>预约管理</span>
            </div>
            <el-table :data="appointments" style="width: 100%">
                <el-table-column prop="serviceType" label="服务类型"></el-table-column>
                <el-table-column prop="serviceDescription" label="服务描述"></el-table-column>
                <el-table-column label="预约时间">
                    <template slot-scope="scope">
                        {{ formatDate(scope.row.appointmentTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="specialRequirements" label="特殊要求"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span :class="['status-bubble', `status-${scope.row.status}`]">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="staff.name" label="服务人员"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="cancelAppointment(scope.row)" size="mini">取消</el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status === '已取消'" @click="closeService(scope.row)" size="mini">
                            关闭服务
                        </el-button>
                        <el-button v-else disabled size="mini">
                            关闭服务
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            appointments: [] // 存储预约数据
        };
    },
    methods: {
        //关闭服务
        async closeService(appointment) {
            await axios({
                url:'http://localhost:3000/closeService',
                method:"post",
                data:{
                    id: appointment.id
                }
            })
            this.$message.success('已关闭服务');
            this.getAppointments();
        },
        //格式化时间
        formatDate(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
        //取消服务
        cancelAppointment(appointment) {
            axios.post('http://localhost:3000/cancelReservationService', { id: appointment.id })
                .then(response => {
                    if (response.data.code === 1) {
                        this.$message.success('预约已取消');
                        this.getAppointments()
                    } else {
                        this.$message.error('取消预约失败: ' + response.data.msg);
                    }
                })
                .catch(error => {
                    this.$message.error('请求错误: ' + error);
                });
        },
        //获取预约列表
        async getAppointments() {
            const userId = localStorage.getItem('userId');
            try {
                let res = await axios({
                    url: 'http://localhost:3000/getAListOfPersonalAppointmentServices',
                    method: 'get',
                    params: {
                        id: userId,
                    }
                });
                // 正确引用 API 响应数据
                if (res.data.data && Array.isArray(res.data.data.list)) {
                    this.appointments = res.data.data.list;
                    console.log(this.appointments);
                } else {
                    console.error('Expected list not found in response:', res.data);
                    this.appointments = [];
                }
            } catch (error) {
                console.error("Error fetching appointment list:", error);
                this.appointments = [];
            }
        }
    },
    async created() {
        // 加载预约数据
        this.getAppointments();
    }
}
</script>

<style lang="scss" scoped>
.status-bubble {
    padding: 3px 10px;
    color: white;
    border-radius: 10px;
    text-align: center;
}

.status-待确认 {
    background-color: #ffcc00; // 黄色
}

.status-已通过 {
    background-color: #5cb85c; // 绿色
}

.status-已接取 {
    background-color: #0275d8; // 蓝色
}

.status-已完成 {
    background-color: #5bc0de; // 浅蓝色
}

.status-已取消 {
    background-color: #d9534f; // 红色
}
</style>

