<template>
    <div>
        <div class="audit-container">
            <el-card class="audit-card">
                <div slot="header" class="clearfix">
                    <span>服务审核</span>
                </div>
            </el-card>
            <el-container>
                <el-header>
                    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1">首页</el-menu-item>
                        <el-menu-item index="2">服务列表</el-menu-item>
                        <el-menu-item index="3">审核服务</el-menu-item>
                        <el-menu-item index="4">用户管理</el-menu-item>
                    </el-menu>
                </el-header>
                <el-main>
                    <div class="search-area">
                        <el-input v-model="search" placeholder="通过编号搜索服务..." class="search-input"></el-input>
                        <el-button type="primary" icon="el-icon-search" @click="searchService">搜索</el-button>
                    </div>
                    <el-table :data="filteredServiceList" style="width: 100%" stripe>
                        <el-table-column prop="id" label="服务编号" width="100"></el-table-column>
                        <el-table-column prop="date" label="申请日期" width="180"></el-table-column>
                        <el-table-column prop="name" label="申请者" width="200"></el-table-column>
                        <el-table-column prop="type" label="服务类型" width="200"></el-table-column>
                        <el-table-column label="操作" width="180">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small"
                                    @click="approveService(scope.$index, scope.row)">批准</el-button>
                                <el-button type="danger" size="small"
                                    @click="rejectService(scope.$index, scope.row)">拒绝</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '3', // 当前活动菜单的索引
            search: '', // 搜索框数据绑定
            serviceList: [
                { id: '001', date: '2023-12-22', name: '张三', type: '家政服务' },
                { id: '002', date: '2023-12-20', name: '李四', type: '健康咨询' },
                // 更多服务数据...
            ],
        };
    },
    computed: {
        filteredServiceList() {
            if (!this.search) {
                return this.serviceList;
            }
            return this.serviceList.filter(service => service.id.includes(this.search));
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handleRowClick(row, column, event) {
            // 可以在这里处理行点击事件
        },
        searchService() {
            // 这里可以实现更复杂的搜索逻辑，如果需要的话
            // 由于我们使用了计算属性，所以这里实际上不需要执行任何操作，搜索逻辑已经在计算属性中定义
        },
        approveService(index, row) {
            console.log('批准服务:', row);
            // 在这里调用API来批准服务
        },
        rejectService(index, row) {
            console.log('拒绝服务:', row);
            // 在这里调用API来拒绝服务
        }
    }
};
</script>

<style  scoped>
.audit-container {
    margin: 20px;
}

.audit-card {
    margin-bottom: 20px;
}

.search-area {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
}

.search-input {
    margin-right: 10px;
    flex: 1; /* Allows input to fill space */
}
</style>