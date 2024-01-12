<template>
    <div>
        <el-card>
            <div slot="header">
                <span>预约服务</span>
            </div>
            <el-table :data="pendingAppointments" style="width: 100%">
                <el-table-column prop="id" label="预约ID"></el-table-column>
                <el-table-column prop="serviceType" label="服务类型"></el-table-column>
                <el-table-column prop="serviceDescription" label="服务描述"></el-table-column>
                <el-table-column label="预约时间">
                    <template slot-scope="scope">
                        {{ formatDateTime(scope.row.appointmentTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="general.name" label="客户姓名"></el-table-column>
                <el-table-column prop="general.phone" label="客户电话"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span :class="['status-bubble', `status-${scope.row.status}`]">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status === '已通过'" type="primary" size="small"
                            @click="acceptService(scope.row)">接取服务</el-button>
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
            pendingAppointments: []
        };
    },
    methods: {
        //接取服务
        async acceptService(appointment) {
            const userId = localStorage.getItem('userId');
            try {
                await axios({
                    url: `http://localhost:3000/auditServices`,
                    method: 'post',
                    data: {
                        id: appointment.id,
                        status: '已接取',
                        staff: {
                            id: userId
                        }
                    }
                });
                this.$message.success('预约服务已接取');
                this.fetchPendingAppointments(); // 重新获取预约列表
            } catch (error) {
                his.$message.error('请求错误: ' + error);
            }
        },
        formatDateTime(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
        async fetchPendingAppointments() {
            let res = await axios({
                url: 'http://localhost:3000/getappointmentList',
                method: 'get',
            })
            this.pendingAppointments = res.data.data.list
            console.log(this.pendingAppointments);
        },

    },
    created() {
        this.fetchPendingAppointments();
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

.status-已评价 {
    background-color: #ec1089; // 粉色
}

.status-已拒绝 {
    background-color: #6c757d; // 灰色
}
</style>
