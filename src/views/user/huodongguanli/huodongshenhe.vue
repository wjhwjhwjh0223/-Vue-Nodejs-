<template>
    <div>
        <el-card>
            <div slot="header">
                <span>活动审核</span>
            </div>
        </el-card>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="time" label="活动时间" :formatter="row => formatDateTime(row.time)">
            </el-table-column>
            <el-table-column prop="name" label="活动名称">
            </el-table-column>
            <el-table-column prop="description" label="活动简介">
            </el-table-column>
            <el-table-column prop="location" label="活动地址" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="participantCount" label="活动人数" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="activityType" label="活动类型">
            </el-table-column>
            <el-table-column label="负责人" :formatter="renderStaffName">
            </el-table-column>
            <el-table-column label="活动状态" width="120">
                <template slot-scope="scope">
                    <el-tag :type="getStatusTagType(scope.row.status)">
                        {{ scope.row.status }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button type="primary" @click="approveSelection()">同意</el-button>
            <el-button type="danger" @click="rejectSelection()">拒绝</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            tableData: [],
            multipleSelection: []
        }
    },
    methods:
    //获取活动列表以及状态
    {
        renderStaffName(row) {
            return row.staff ? row.staff.name : '暂无';
        },
        formatDateTime(dateTime) {
            const date = new Date(dateTime);
            return new Intl.DateTimeFormat('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(date);
        },
        async getactivity() {
            let res = await axios({
                url: 'http://localhost:3000/getactivityList',
                method: 'get',
            })
            console.log(res, '---------------')
            this.tableData = res.data.data.list
            console.log(this.tableData)
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        async updateRowStatus(row) {
            try {
                // 发送POST请求到后端更新状态的接口
                let response = await axios.post('http://localhost:3000/updateActivityStauts', {
                    id: row.id, // 假设后端根据id识别需要更新的活动
                    status: row.activitystatus // 新的活动状态
                });

                // 检查响应，确认后端操作成功
                if (response.data && response.data.code === 1) {
                    this.$message.success('状态更新成功！');
                    this.getactivity();
                } else {
                    this.$message.error('状态更新失败：' + response.data.msg);
                }
            } catch (error) {
                // 错误处理
                this.$message.error('请求失败：' + error.message);
            }
        },
        approveSelection() {
            this.multipleSelection.forEach(row => {
                row.activitystatus = '已同意'; // 设置新状态
                this.updateRowStatus(row); // 调用更新状态的方法
            });
            this.refreshTable();
        },

        rejectSelection() {
            this.multipleSelection.forEach(row => {
                row.activitystatus = '已拒绝'; // 设置新状态
                this.updateRowStatus(row); // 调用更新状态的方法
            });
            this.refreshTable();
        },

        refreshTable() {
            // 刷新表格的一个简单方式是使用一个新数组替换掉原来的数组
            this.tableData = [...this.tableData];
            this.$refs.multipleTable.clearSelection();
        }, getStatusTagType(status) {
            switch (status) {
                case '计划中':
                    return 'info';
                case '已同意':
                    return 'success';
                case '已完成':
                    return 'primary';
                case '已拒绝':
                    return 'warning';
                default:
                    return 'default';
            }
        }


    },
    async created() {
        this.getactivity()
    }

}
</script>

<style lang="scss" scoped></style>
