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
            <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="activityname" label="活动名称" width="120">
            </el-table-column>
            <el-table-column prop="address" label="活动地址" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="activitytype" label="活动类型" width="120">
            </el-table-column>
            <el-table-column label="活动状态" width="120">
                <template slot-scope="scope">
                    <el-tag :type="getStatusTagType(scope.row.activitystatus)">
                        {{ scope.row.activitystatus }}
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
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-03',
                activityname: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                activitytype: '美食/餐厅线上活动',
                activitystatus: '进行中'
            }, {
                date: '2016-05-03',
                activityname: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                activitytype: '美食/餐厅线上活动',
                activitystatus: '待审核'
            }, {
                date: '2016-05-03',
                activityname: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                activitytype: '美食/餐厅线上活动',
                activitystatus: '已完成'
            }, {
                date: '2016-05-03',
                activityname: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                activitytype: '美食/餐厅线上活动',
                activitystatus: '待审核'
            }, {
                date: '2016-05-03',
                activityname: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                activitytype: '美食/餐厅线上活动',
                activitystatus: '待审核'
            }, {
                date: '2016-05-03',
                activityname: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                activitytype: '美食/餐厅线上活动',
                activitystatus: '待审核'
            }, {
                date: '2016-05-03',
                activityname: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                activitytype: '美食/餐厅线上活动',
                activitystatus: '待审核'
            }],
            multipleSelection: []
        }
    },

    methods: {
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
        approveSelection() {
            this.multipleSelection.forEach(row => {
                row.activitystatus = '已同意'; // 更新活动状态
                this.updateRowStatus(row);
            });
            this.refreshTable();
        },

        rejectSelection() {
            this.multipleSelection.forEach(row => {
                row.activitystatus = '已拒绝'; // 更新活动状态
                this.updateRowStatus(row);
            });
            this.refreshTable();
        }, updateRowStatus(row) {
            // 这里可以添加发送请求到服务器的代码，例如使用 axios 更新数据库中的活动状态
            // axios.post('/update-status', { id: row.id, status: row.activitystatus })
        },

        refreshTable() {
            // 刷新表格的一个简单方式是使用一个新数组替换掉原来的数组
            this.tableData = [...this.tableData];
            this.$refs.multipleTable.clearSelection();
        }, getStatusTagType(status) {
            switch (status) {
                case '进行中':
                    return 'success';
                case '待审核':
                    return 'warning';
                case '已完成':
                    return 'info';
                case '已同意':
                    return 'primary';
                case '已拒绝':
                    return 'danger';
                default:
                    return '';
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>