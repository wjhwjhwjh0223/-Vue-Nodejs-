<template>
    <div class="service-details-container">
        <el-card>
            <div slot="header">
                <span>服务信息详情</span>
            </div>
            <!-- 服务信息表格 -->
            <h3>服务信息</h3>
            <el-table :data="[serviceDetails]" v-if="serviceDetails" style="width: 100%">
                <el-table-column prop="id" label="服务单号"></el-table-column>
                <el-table-column prop="serviceType" label="服务类型"></el-table-column>
                <el-table-column prop="serviceDescription" label="服务描述"></el-table-column>
                <el-table-column prop="status" label="服务状态">
                    <template slot-scope="scope">
                        <span :class="['status-bubble', `status-${scope.row.status}`]">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预约时间">
                    <template slot-scope="scope">
                        {{ formatDateTime(scope.row.appointmentTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="负责人">
                    <template slot-scope="scope">
                        <div v-if="scope.row.staff && scope.row.staff.name">
                            {{ scope.row.staff.name }}
                        </div>
                        <div v-else>暂无</div>
                    </template>
                </el-table-column>

                <el-table-column label="客户">
                    <template slot-scope="scope">
                        {{ scope.row.general.name }}
                    </template>
                </el-table-column>
                <el-table-column label="特殊情况说明">
                    <template slot-scope="scope">
                        {{ scope.row.cancellationReason ? scope.row.cancellationReason : '无' }}
                    </template>
                </el-table-column>
                <el-table-column label="服务评价">
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

            </el-table>

            <!-- 工作人员信息表格 -->
            <template>
                <h3>工作人员信息</h3>
                <div v-if="serviceDetails && serviceDetails.staff">
                    <el-table :data="[serviceDetails.staff]" style="width: 100%">
                        <el-table-column prop="id" label="员工id"></el-table-column>
                        <el-table-column label="员工头像">
                            <template #default="{ row }">
                                <img width="50" height="50" :src="row.avatar">
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="age" label="年龄"></el-table-column>
                        <el-table-column prop="sex" label="性别"></el-table-column>
                        <el-table-column prop="phone" label="手机号"></el-table-column>
                        <el-table-column prop="address" label="住址"></el-table-column>
                    </el-table>
                </div>
                <div v-else>
                    暂无工作人员信息
                </div>
            </template>


            <!-- 用户信息表格 -->
            <h3>用户信息</h3>
            <el-table :data="[serviceDetails.general]" v-if="serviceDetails.general" style="width: 100%">
                <el-table-column prop="id" label="用户id"></el-table-column>
                <el-table-column label="用户头像">
                    <template #default="{ row }">
                        <img width="50" height="50" :src="row.avatar">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="address" label="住址"></el-table-column>
                <el-table-column prop="contacts" label="紧急联系电话"></el-table-column>
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
            serviceDetails: ''
        };
    },
    created() {
        console.log('~~~~!!!!!!!!!!!')
        this.fetchAllInformation();
    },
    methods: {
        formatDateTime(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
        async fetchAllInformation() {
            try {
                // 使用服务 ID 调用后端接口
                const response = await axios.get('http://localhost:3000/getAllInformation', {
                    params: { id: this.$route.query.id }
                });
                console.log(response.data.data.list);
                // 检查响应码和数据
                if (response.data.code === 1 && response.data.data.list.length > 0) {
                    this.serviceDetails = response.data.data.list[0];
                    console.log(this.serviceDetails);
                } else {
                    console.error('没有找到相关信息');
                }
            } catch (error) {
                console.error('获取信息失败:', error);
            } finally {
                this.loading = false; // 数据加载完毕
            }
        }
    },
};
</script>
  
<style lang="scss" scoped>
h3 {
    /* 添加一些样式 */
    margin-top: 20px;
    font-size: 1.5em;
    color: #333;
}

.status-bubble {
    padding: 3px 10px;
    color: white;
    border-radius: 10px;
    text-align: center;
}

.status-待确认 {
    background-color: #ffcc00;
}

.status-已通过 {
    background-color: #5cb85c;
}

.status-已接取 {
    background-color: #0275d8;
}

.status-已完成 {
    background-color: #5bc0de;
}

.status-已取消 {
    background-color: #d9534f;
}

.status-已评价 {
    background-color: #ec1089;
}

.status-已拒绝 {
    background-color: #6c757d;
}
</style>