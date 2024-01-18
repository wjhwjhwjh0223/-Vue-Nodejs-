<template>
    <div>
        <el-card>
            <div slot="header">
                <span>求助管理</span>
            </div>
            <el-table :data="emergencyList" style="width: 100%">
                <el-table-column prop="details" label="紧急情况描述"></el-table-column>
                <el-table-column prop="type" label="紧急类型"></el-table-column>
                <el-table-column prop="location" label="位置"></el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        {{ formatDate(scope.row.ctime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
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
            emergencyList: []  // 求助列表数据
        };
    },
    mounted() {
        this.fetchEmergencyList();
    },
    methods: {
        //格式化时间
        formatDate(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
        async fetchEmergencyList() {
            // 获取当前用户的ID
            const userId = localStorage.getItem('userId');
            console.log(userId);
            try {
                const res = await axios({
                    url: 'http://localhost:3000/emergencyList/generalId',
                    method: 'get',
                    params: {
                        userId: userId
                    }
                });
                this.emergencyList = res.data.data.list;
                console.log(this.emergencyList);
            } catch (error) {
                console.error('获取求助列表失败', error);
                this.$message.error('获取求助列表失败');
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>
