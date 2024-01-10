<template>
    <div>
        <el-card>
            <div slot="header">
                <span>预约审核</span>
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

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="approveAppointment(scope.row)" size="mini">批准</el-button>
                        <el-button @click="rejectAppointment(scope.row)" size="mini">拒绝</el-button>
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
            pendingAppointments: [] // 存储待审核的预约
        };
    },
    methods: {
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
        approveAppointment(appointment) {
            // 实现批准预约的逻辑
        },
        rejectAppointment(appointment) {
            // 实现拒绝预约的逻辑
        }
    },
    created() {
        this.fetchPendingAppointments();
    }
}
</script>

<style lang="scss" scoped></style>
