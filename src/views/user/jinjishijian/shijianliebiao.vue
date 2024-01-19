<template>
    <div>
        <el-card>
            <div slot="header">
                <span>紧急事件列表</span>
            </div>
            <div class="emergency-events">
                <el-row>
                    <el-col :span="24">
                        <el-table :data="events" stripe class="events-table">
                            <el-table-column prop="id" label="事件编号" width="80"></el-table-column>
                            <el-table-column prop="type" label="事件类型" width="120"></el-table-column>
                            <el-table-column prop="details" label="紧急事件详情" width="400"></el-table-column>
                            <el-table-column prop="general.name" label="发起紧急人" width="90"></el-table-column>
                            <el-table-column prop="status" label="状态" width="90"></el-table-column>
                            <el-table-column prop="location" label="位置" width="200"></el-table-column>
                            <el-table-column label="创建时间">
                                <template slot-scope="scope">
                                    {{ formatDate(scope.row.ctime) }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="viewProcess(scope.row)">查看流程</el-button>
                                    <el-button type="info" size="small" @click="viewDetails(scope.row)">查看详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-dialog title="流程" :visible.sync="dialogVisible">
            <el-timeline>
                <el-timeline-item v-for="(item, index) in processDetails" :key="index" :timestamp="item.timestamp">
                    {{ item.content }}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
        <el-dialog title="事件详情" :visible.sync="detailsDialogVisible" class="details-dialog">
            <div v-if="selectedEvent" class="event-details">
                <ul>
                    <li><strong>事件编号：</strong>{{ selectedEvent.id }}</li>
                    <li><strong>事件类型：</strong>{{ selectedEvent.type }}</li>
                    <li><strong>紧急事件详情：</strong>{{ selectedEvent.details }}</li>
                    <li><strong>发起紧急人：</strong>{{ selectedEvent.general.name }}&nbsp;&nbsp;&nbsp;&nbsp;
                        <strong>联系电话：</strong>{{ selectedEvent.general.phone }}
                    </li>
                    <li><strong>状态：</strong>{{ selectedEvent.status }}</li>
                    <li><strong>位置：</strong>{{ selectedEvent.location }}</li>
                    <li><strong>创建时间：</strong>{{ formatDate(selectedEvent.ctime) }}</li>
                    <li v-for="item in staffInformation">
                        工作人员:{{ item.staff.name }}&nbsp;&nbsp;&nbsp;&nbsp; 联系电话:{{ item.staff.phone }}
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>未选择事件</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            events: [], // 事件数据
            dialogVisible: false,
            processDetails: [], // 流程详情数据
            detailsDialogVisible: false, // 控制详情弹框的显示
            selectedEvent: null, // 被选中的事件
            staffInformation: []
        };
    },
    methods: {
        async viewDetails(rowData) {
            this.selectedEvent = rowData;
            this.detailsDialogVisible = true;
            const emergencyResponseID = this.selectedEvent.id
            let res = await axios({
                url: `http://localhost:3000/emergencyStaff`,
                method: 'get',
                params: {
                    id: emergencyResponseID
                }
            });
            if (res.data && res.data.data) {
                this.staffInformation = res.data.data.res;
            }
            // this.staffInformation.forEach((item) => {
            //     console.log(`Name: ${item.staff.name}, Phone: ${item.staff.phone}`);
            // });
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
        //格式化时间
        formatDate(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
        async fetchEvents() {
            let res = await axios({
                url: 'http://localhost:3000/emergencyResponseList',
                method: 'get',
            })
            this.events = res.data.data.list;
        }
    },
    mounted() {
        this.fetchEvents();
    },
};
</script>
<style scoped>
.details-dialog .event-details ul {
    list-style: none;
    padding: 0;
}

.details-dialog .event-details ul li {
    margin-bottom: 10px;
    line-height: 1.6;
    border-bottom: 1px solid #eee;
    /* 可以给每个详情项加一个底部边框 */
    padding-bottom: 10px;
}

.details-dialog .event-details ul li:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.details-dialog .event-details ul li strong {
    color: #333;
    /* 标题颜色 */
    margin-right: 5px;
}

/* 适当调整对话框内边距 */
.el-dialog__body {
    padding: 20px 30px;
}
</style>
