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
                <el-table-column prop="status" label="状态"></el-table-column>
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
            this.$message.success('预约服务已通过');
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
  
<style scoped>
/* CSS 样式 */
</style>
  