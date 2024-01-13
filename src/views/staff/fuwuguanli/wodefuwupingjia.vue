<template>
    <div>
        <el-card>
            <div slot="header">
                <span>我的服务评价</span>
            </div>
            <el-table :data="appointments" style="width: 100%">
                <el-table-column prop="id" label="服务单号"></el-table-column>
                <el-table-column prop="serviceType" label="服务类型"></el-table-column>
                <el-table-column prop="appointmentTime" label="预约时间">
                    <template slot-scope="scope">
                        {{ formatDate(scope.row.time) }}
                    </template>
                </el-table-column>
                <el-table-column prop="general.name" label="客户"></el-table-column>
                <el-table-column prop="general.phone" label="客户电话"></el-table-column>
                <el-table-column label="服务评分">
                    <template slot-scope="scope">
                        <el-rate v-if="scope.row.feedback && scope.row.feedback.rating !== null"
                            :value="Number(scope.row.feedback.rating)" disabled show-score></el-rate>
                        <div v-else>暂无</div>
                    </template>
                </el-table-column>
                <el-table-column label="评价内容">
                    <template slot-scope="scope">
                        <div v-if="scope.row.feedback && scope.row.feedback.comment">{{ scope.row.feedback.comment }}</div>
                        <div v-else>暂无</div>
                    </template>
                </el-table-column>
                <el-table-column label="评价时间">
                    <template slot-scope="scope">
                        <div v-if="scope.row.feedback && scope.row.feedback.ctime">
                            {{ formatDate(scope.row.feedback.ctime) }}
                        </div>
                        <div v-else>暂无</div>
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
            appointments: [] // 从后端获取的数据将存储在这里
        };
    },
    created() {
        this.fetchAppointments();
    },
    methods: {
        async fetchAppointments() {
            let userId = localStorage.getItem('userId');
            let res = await axios({
                url: 'http://localhost:3000/staffViewServiceList',
                method: 'get',
                params: {
                    id: userId
                }
            })
            this.appointments = res.data.data.list;
            console.log(this.appointments)
        },
        //格式化日期
        formatDate(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
    }
}
</script>

<style lang="scss" scoped>
// 自定义样式
</style>
