<template>
    <div>
        <el-card>
            <div slot="header">
                <span>活动审核</span>
            </div>
            <!-- 搜索栏和分类筛选 -->
            <div class="top-bar">
                <el-select v-model="params.activityType" placeholder="请选择" @change="getactivity">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="default" icon="el-icon-refresh" @click="resetSearch">
                    重置
                </el-button>
            </div>
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
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="success" size="small" @click="markAsCompleted(scope.row)"
                            v-if="scope.row.status === '已同意' && isPast(scope.row.time)">
                            标记为已完成
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                :page-size="pagesize">
            </el-pagination>
            <div style="margin-top: 20px">
                <el-button type="primary" @click="approveSelection()">同意</el-button>
                <el-button type="danger" @click="rejectSelection()">拒绝</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import axios from 'axios';
export default {
    data() {
        return {
            params: {
                activityType: ''
            },
            pagenumber: 1,
            pagesize: 5,
            total: this.total,
            options: [
                { value: '社交活动', label: '社交活动' },
                { value: '教育活动', label: '教育活动' },
                { value: '音乐和舞蹈', label: '音乐和舞蹈' },
                { value: '旅游和户外活动', label: '旅游和户外活动' },
                { value: '健康与养生', label: '健康与养生' },
                { value: '体育活动', label: '体育活动' },
                { value: '其他', label: '其他' },
            ],
            tableData: [],
            multipleSelection: []
        }
    },
    methods:
    //获取活动列表以及状态
    {
        isPast(time) {
            return dayjs().isAfter(dayjs(time));
        },

        // 标记活动为已完成
        async markAsCompleted(row) {
            if (row.status === '已同意' && this.isPast(row.time)) {
                // 逻辑更新活动状态为“已完成”
                try {
                    let response = await axios.post('http://localhost:3000/updateActivityStauts', {
                        id: row.id,
                        status: '已完成' // 假设这是你后端需要的状态值
                    });
                    if (response.data && response.data.code === 1) {
                        this.$message.success('活动已标记为已完成');
                        this.getactivity(); // 刷新列表
                    } else {
                        this.$message.error('操作失败：' + response.data.msg);
                    }
                } catch (error) {
                    this.$message.error('请求失败：' + error.message);
                }
            } else {
                this.$message.warning('不满足标记为已完成的条件');
            }
        },
        resetSearch() {
            // 重置 params 对象
            this.params.activityType = '';
            this.getactivity()
        },
        pagechange(pagenumber) {
            //console.log(`页码改变了：${pagenumber}`);
            this.pagenumber = pagenumber
            this.getactivity()
        },
        async performSearch() {
            //console.log("需要把以下的数据发给后端")
            //console.log(this.pagenumber, this.pagesize, this.params.username)
            this.getactivity()

        },
        renderStaffName(row) {
            return row.staff ? row.staff.name : '暂无';
        },
        formatDateTime(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },
        async getactivity() {
            let res = await axios({
                url: 'http://localhost:3000/getactivityList',
                method: 'get',
                params: {
                    pagenumber: this.pagenumber,
                    pagesize: this.pagesize,
                    ...this.params // 包含搜索参数
                }
            })
            //console.log(res, '---------------')
            this.tableData = res.data.data.list
            this.total = res.data.data.total;
            //console.log(this.tableData)
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
