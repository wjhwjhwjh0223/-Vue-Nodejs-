<template>
    <div>
        <el-card>
            <div slot="header">
                <span>服务状态</span>
            </div>
        </el-card>
        <div class="service-status-container">
            <!-- 顶部功能区域，包含搜索和筛选 -->
            <el-row :gutter="20" class="search-filter-row">
                <el-col :span="8">
                    <el-input v-model="search" placeholder="请输入服务编号搜索..." @keyup.enter="fetchServices" clearable>
                        <!-- 在el-input内部使用slot插槽添加搜索按钮 -->
                        <el-button slot="append" icon="el-icon-search" @click="fetchServices">
                            搜索
                        </el-button>
                    </el-input>
                </el-col>
                <el-col :span="16">
                    <el-select v-model="filterStatus" placeholder="选择状态" @change="fetchServices">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="完成" value="completed"></el-option>
                        <el-option label="进行中" value="in_progress"></el-option>
                        <el-option label="等待接取" value="pending"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <!-- 服务列表表格 -->
            <el-table :data="filteredServices" style="width: 100%" stripe>
                <el-table-column prop="id" label="服务编号" width="100"></el-table-column>
                <el-table-column prop="name" label="服务名称" width="180"></el-table-column>
                <el-table-column prop="status" label="状态" width="180">
                    <template v-slot="scope">
                        <el-tag :type="statusTagType(scope.row.status)">
                            {{ statusText(scope.row.status) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <!-- 其他列 -->
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '', // 搜索关键词
            filterStatus: '', // 筛选的状态
            services: [], // 服务列表数据
        };
    },
    computed: {
        // 根据搜索关键词和筛选状态计算过滤后的服务列表
        filteredServices() {
            return this.services.filter(service => {
                return (
                    (this.filterStatus ? service.status === this.filterStatus : true) &&
                    (this.search ? service.name.includes(this.search) : true)
                );
            });
        },
    },
    methods: {
        fetchServices() {
            // 从服务器获取服务列表，根据search和filterStatus筛选
        },
        statusTagType(status) {
            // 根据状态返回不同的标签类型
            switch (status) {
                case 'completed':
                    return 'success';
                case 'in_progress':
                    return 'info';
                case 'pending':
                    return 'warning';
                default:
                    return 'default';
            }
        },
        statusText(status) {
            // 根据状态返回文本描述
            switch (status) {
                case 'completed':
                    return '完成';
                case 'in_progress':
                    return '进行中';
                case 'pending':
                    return '等待接取';
                default:
                    return '未知';
            }
        },
    },
    created() {
        this.fetchServices();
    },
};
</script>

<style scoped>
.service-status-container {
    padding: 20px;
}

.search-filter-row {
    margin-bottom: 20px;
}
</style>