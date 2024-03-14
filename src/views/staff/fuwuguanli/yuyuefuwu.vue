<template>
    <div>
        <el-card>
            <div slot="header">
                <span>预约服务</span>
            </div>
            <!-- 搜索栏和分类筛选 -->
            <div class="top-bar">
                <el-select v-model="params.serviceType" placeholder="请选择" @change="fetchPendingAppointments">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="default" icon="el-icon-refresh" @click="resetSearch">
                    重置
                </el-button>
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
            <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                :page-size="pagesize">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            options: [
                { value: '家政服务', label: '家政服务' },
                { value: '医疗护理', label: '医疗护理' },
                { value: '餐饮服务', label: '餐饮服务' },
                { value: '健康监护', label: '健康监护' },
                { value: '休闲娱乐', label: '休闲娱乐' },
                { value: '心理咨询', label: '心理咨询' },
                { value: '交通服务', label: '交通服务' },
                { value: '教育学习', label: '教育学习' }
            ], params: {
                serviceType: ''
            },
            pagenumber: 1,
            pagesize: 5,
            total: this.total,
            pendingAppointments: []
        };
    },
    methods: {
        pagechange(pagenumber) {
            //console.log(`页码改变了：${pagenumber}`);
            this.pagenumber = pagenumber
            // 重新请求数据
            this.fetchPendingAppointments()
        },
        async performSearch() {
            //console.log("需要把以下的数据发给后端")
            //console.log(this.pagenumber, this.pagesize, this.params.username)
            this.fetchPendingAppointments()

        },
        resetSearch() {
            // 重置 params 对象
            this.params.serviceType = '';
            this.fetchPendingAppointments()
        },
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
                params: {
                    pagenumber: this.pagenumber,
                    pagesize: this.pagesize,
                    ...this.params // 包含搜索参数
                }
            })
            this.pendingAppointments = res.data.data.list
            this.total = res.data.data.total;
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
