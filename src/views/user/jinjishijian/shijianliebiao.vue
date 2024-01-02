<template>
    <div>
        <el-card>
            <div slot="header">
                <span>紧急事件列表</span>
            </div>
        </el-card>
        <div class="emergency-events">
            <el-row>
                <el-col :span="24">
                    <el-card class="card-container">
                        <div slot="header" class="header">
                            紧急事件列表
                        </div>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-input v-model="searchQuery" placeholder="搜索事件编号或标题..." clearable
                                    @keyup.enter="fetchEvents" class="search-input">
                                    <el-button slot="append" icon="el-icon-search" @click="fetchEvents">搜索</el-button>
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-select v-model="selectedStatus" placeholder="选择状态" class="status-select"
                                    @change="fetchEvents">
                                    <el-option label="所有" value=""></el-option>
                                    <el-option label="未处理" value="unhandled"></el-option>
                                    <el-option label="处理中" value="in_progress"></el-option>
                                    <el-option label="已解决" value="resolved"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-table :data="events" stripe class="events-table">
                            <!-- 表格列 -->
                        </el-table>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            selectedStatus: '',
            events: [], // 事件数据
        };
    },
    methods: {
        fetchEvents() {
            // 调用API获取事件列表，根据searchQuery和selectedStatus进行筛选
        },
        statusType(status) {
            // 根据事件状态返回对应的标签类型
            switch (status) {
                case 'unhandled': return 'danger';
                case 'in_progress': return 'warning';
                case 'resolved': return 'success';
                default: return 'info';
            }
        },
        handleEvent(event) {
            // 处理事件的逻辑
            console.log('Handling event:', event);
        },
    },
    mounted() {
        this.fetchEvents();
    },
};
</script>

<style scoped>
.emergency-events {
    padding: 20px;
}

.card-container {
    border: 1px solid #ebeef5;
    border-radius: 4px;
}

.header {
    background-color: #f5f7fa;
    line-height: 36px;
    font-size: 15px;
    color: #303133;
}

.search-input {
    width: 100%;
    margin-bottom: 20px;
    /* 与下拉选择间距 */
}

.status-select {
    width: 100%;
    margin-bottom: 20px;
    /* 与表格间距 */
}

.events-table {
    width: 100%;
    /* 表格宽度 */
}
</style>