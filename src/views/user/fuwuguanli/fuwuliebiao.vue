<template>
    <div>
        
        <el-card>
            <div slot="header">
                <span>服务列表</span>
            </div>
            <el-table :data="services" style="width: 100%">
                <el-table-column prop="id" label="服务单号"></el-table-column>
                <el-table-column prop="serviceType" label="服务类型"></el-table-column>
                <el-table-column prop="serviceDescription" label="服务描述"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span :class="['status-bubble', `status-${scope.row.status}`]">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="general.name" label="客户"></el-table-column>
                <el-table-column prop="staff.name" label="服务人员"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot:default="scope">
                        <el-button @click="viewServiceDetails(scope.row.id)">查看详情</el-button>
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
            services: [], // 存储服务列表数据
        };
    },
    methods: {
        //路由跳转
        viewServiceDetails(serviceId) {
            this.$router.push({ name: 'ServiceDetails', query: { id: serviceId } });
        },
        formatDateTime(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
        // 获取服务列表
        async getServices() {
            let res = await axios({
                url: 'http://localhost:3000/getAllInformation',
                method: 'get',
            })
            this.services = res.data.data.list

        },
    },
    created() {
        this.getServices(); // 组件创建时获取服务列表
        console.log(this.services);
    }
};

</script>
  
<style lang="scss" scoped>
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
  