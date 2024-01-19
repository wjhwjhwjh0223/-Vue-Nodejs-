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
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span class="status-bubble">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="viewProcess(scope.row)">查看流程</el-button>
                        <el-button v-if="scope.row.status === '已前往'" type="success" size="small"
                            @click="completeEmergency(scope.row)">
                            标记为已完成
                        </el-button>
                    </template>

                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="流程" :visible.sync="dialogVisible">
            <el-timeline>
                <el-timeline-item v-for="(item, index) in processDetails" :key="index" :timestamp="item.timestamp">
                    {{ item.content }}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            emergencyList: [], // 求助列表数据
            dialogVisible: false, // 控制弹窗的显示
            processDetails: [], // 流程详情数据
        };
    },
    mounted() {
        this.fetchEmergencyList();
    },
    methods: {
        //标记为已完成
        async completeEmergency(row) {
            //console.log(row);
            const response = await axios.post('http://localhost:3000/completeEmergencyEvents', row);
            this.$message.success('更新成功');
            this.fetchEmergencyList()
        },
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
        },
        viewProcess(rowData) {
            // 清空先前的流程详情
            this.processDetails = [];

            // 检查rowData中是否有flow字段
            if (rowData && rowData.flow) {
                // 按逗号拆分字符串
                const events = rowData.flow.split('.').filter(item => item.trim() !== '');

                // 对每个事件按斜杠拆分，提取描述和时间戳
                events.forEach(event => {
                    const parts = event.split('/').map(part => part.trim());
                    if (parts.length >= 2) {
                        this.processDetails.push({
                            content: parts[0], // 事件描述
                            timestamp: parts[1] // 事件时间戳
                        });
                    }
                });
            }

            // 打开弹窗
            this.dialogVisible = true;
        },
    }
}
</script>

<style lang="scss" scoped>
.status-bubble {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 15px;
    background-color: #ebeef5;
    color: #606266;
    font-size: 14px;
    line-height: normal;
    text-align: center;

}
</style>

