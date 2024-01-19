<template>
    <div>
        <el-card>
            <div slot="header">
                <span>我的紧急事件</span>
            </div>
            <el-table :data="emergencyList" style="width: 100%">
                <el-table-column prop="emergencyResponse.id" label="事件ID"></el-table-column>
                <el-table-column prop="emergencyResponse.details" label="详情" width="500px"></el-table-column>
                <el-table-column prop="emergencyResponse.type" label="类型"></el-table-column>
                <el-table-column prop="emergencyResponse.location" label="位置"></el-table-column>
                <el-table-column prop="emergencyResponse.status" label="状态"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" :disabled="scope.row.emergencyResponse.status !== '待响应'"
                            @click="updateStatus(scope.row)">
                            正在前往
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            emergencyList: []  // 存储紧急事件数据
        };
    },
    mounted() {
        this.fetchEmergencyEvents();  // 加载时获取紧急事件数据
    },
    methods: {
        async updateStatus(row) {
            console.log(row)
            const response = await axios.post('http://localhost:3000/toEmergencyStaffLocation', row);
            console.log(response)
            this.$message.success('更新成功');
            this.fetchEmergencyEvents()
        },
        async fetchEmergencyEvents() {
            try {
                const staffId = localStorage.getItem('userId');  // 获取当前用户ID
                const res = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/emergencyStaffList',
                    params: {
                        staffId: staffId
                    }

                })
                this.emergencyList = res.data.data.list
                console.log(this.emergencyList)
            } catch (error) {
                console.error('获取紧急事件列表失败:', error);
            }
        }
    }
}
</script>
<style lang="scss" scoped></style>
