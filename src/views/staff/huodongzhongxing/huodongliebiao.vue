<template>
    <div>
        <el-card>
            <div slot="header">
                <span>活动列表</span>
            </div>
            <div class="top-bar">
                <el-select v-model="params.activityType" placeholder="请选择" @change="getactivity">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="default" icon="el-icon-refresh" @click="resetSearch">
                    重置
                </el-button>
            </div>
            <el-table :data="activityList" style="width: 100%">
                <el-table-column prop="name" label="活动名称"></el-table-column>
                <el-table-column prop="description" label="活动描述"></el-table-column>
                <el-table-column prop="time" label="活动时间" :formatter="row => formatDateTime(row.time)">
                </el-table-column>
                <el-table-column prop="location" label="活动地点"></el-table-column>
                <el-table-column prop="activityType" label="活动类型"></el-table-column>
                <el-table-column prop="participantCount" label="参加人数"></el-table-column>
                <el-table-column label="负责人" :formatter="renderStaffName">
                </el-table-column>
                <el-table-column label="活动状态">
                    <template slot-scope="scope">
                        <span
                            :style="{ backgroundColor: statusColorMap[scope.row.status], color: 'white', borderRadius: '10px', padding: '3px 10px', fontSize: '0.8em' }">
                            {{ scope.row.status }}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                :page-size="pagesize">
            </el-pagination>
        </el-card>
    </div>
</template>
  
<script>
import axios from 'axios';
import dayjs from 'dayjs';
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
            // 存储活动列表
            activityList: [],
            pagenumber: 1,
            pagesize: 5,
            total: this.total,
            statusColorMap: {
                '计划中': 'blue',
                '已同意': 'green',
                '已完成': 'grey',
                '已拒绝': 'red'
            },
        };
    },
    methods: {
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
        // 获取活动列表
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
            this.activityList = res.data.data.list
            this.total = res.data.data.total;
            //console.log(this.tableData)
        },
        // 渲染负责人姓名
        renderStaffName(row) {
            return row.staff ? row.staff.name : '暂无';
        }, 
        formatDateTime(dateTime) {
      return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    created() {
        this.getactivity(); // 组件创建时获取活动列表
    },
};
</script>
  
  

<style lang="scss" scoped></style>