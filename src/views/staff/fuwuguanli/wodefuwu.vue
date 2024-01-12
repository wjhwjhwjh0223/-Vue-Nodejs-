<template>
    <div>
        <el-card>
            <div slot="header">
                <span>我接取的服务</span>
            </div>
            <el-table :data="myServices" style="width: 100%">
                <el-table-column prop="id" label="服务ID"></el-table-column>
                <el-table-column prop="serviceType" label="服务类型"></el-table-column>
                <el-table-column prop="serviceDescription" label="服务描述"></el-table-column>
                <el-table-column prop="appointmentTime" label="预约时间">
                    <template slot-scope="scope">
                        {{ formatDate(scope.row.time) }}
                    </template>
                </el-table-column>
                <el-table-column prop="specialRequirements" label="特殊要求"></el-table-column>
                <el-table-column prop="general.name" label="需求用户"></el-table-column>
                <el-table-column prop="general.phone" label="用户电话"></el-table-column>
                <el-table-column prop="general.age" label="用户年龄"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span :class="['status-bubble', `status-${scope.row.status}`]">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button 
                            type="success" 
                            size="small" 
                            @click="markAsCompleted(scope.row)"
                            :disabled="scope.row.status !== '已接取'">已完成
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
            myServices: []
        };
    },
    methods: {
        //更新状态为已完成
        async markAsCompleted(service){
            await axios({
                url:'http://localhost:3000/auditServices',
                method:'post',
                data: {
                        id: service.id,
                        status: '已完成' // 表示完成状态
                    }    
            })
            this.$message.success('服务已完成');
            this.fetchMyServices();
        },
        //格式化日期
        formatDate(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
        //获取我的服务列表
        async fetchMyServices() {
            let userId = localStorage.getItem('userId');
            let res = await axios({
                url: 'http://localhost:3000/staffViewServiceList',
                method: 'get',
                params: {
                    id: userId
                }
            })
            this.myServices = res.data.data.list;
            console.log(this.myServices)
        }
    },
    created() {
        this.fetchMyServices();
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
