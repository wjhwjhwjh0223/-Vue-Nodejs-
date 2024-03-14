<template>
    <div>
        
        <el-card>
            <div slot="header">
                <span>服务列表</span>
            </div>
            <!-- 搜索栏和分类筛选 -->
            <div class="top-bar">
                <el-select v-model="params.serviceType" placeholder="请选择" @change="getServices">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="default" icon="el-icon-refresh" @click="resetSearch">
                    重置
                </el-button>
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
                serviceType: ''
            },
            pagenumber: 1,
            pagesize: 5,
            total: this.total,
            options: [
                { value: '家政服务', label: '家政服务' },
                { value: '医疗护理', label: '医疗护理' },
                { value: '餐饮服务', label: '餐饮服务' },
                { value: '健康监护', label: '健康监护' },
                { value: '休闲娱乐', label: '休闲娱乐' },
                { value: '心理咨询', label: '心理咨询' },
                { value: '交通服务', label: '交通服务' },
                { value: '教育学习', label: '教育学习' }
            ],
            services: [], // 存储服务列表数据
        };
    },
    methods: {
        resetSearch() {
            // 重置 params 对象
            this.params.serviceType = '';
            this.getServices()
        },
        pagechange(pagenumber) {
            //console.log(`页码改变了：${pagenumber}`);
            this.pagenumber = pagenumber
            // 重新请求数据httpfetchPendingAppointments
            this.getServices()
        },
        async performSearch() {
            //console.log("需要把以下的数据发给后端")
            //console.log(this.pagenumber, this.pagesize, this.params.username)
            this.getServices()

        },
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
                params: {
                    pagenumber: this.pagenumber,
                    pagesize: this.pagesize,
                    ...this.params // 包含搜索参数
                }
            })
            this.services = res.data.data.list
            this.total = res.data.data.total;
        },
    },
    created() {
        this.getServices(); // 组件创建时获取服务列表
        //console.log(this.services);
    }
};

</script>
  
<style lang="scss" scoped>
.top-bar {
    display: flex;
    align-items: center;
    padding: 10px;

}
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
  