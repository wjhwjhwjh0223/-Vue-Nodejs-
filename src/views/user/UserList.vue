<template>
    <div>
        <el-card>
            <div slot="header">
                <span>用户列表</span>
            </div>
            <div class="top-bar">
                <el-input v-model="list.id" placeholder="输入用户ID" class="search-input" @keyup.enter="performSearch">
                </el-input>
                <el-input v-model="list.username" placeholder="输入用户名" class="search-input" @keyup.enter="performSearch">
                </el-input>
                <el-button type="primary" icon="el-icon-search" @click="performSearch">
                    搜索
                </el-button>
                <el-button type="default" icon="el-icon-refresh" @click="resetSearch">
                    重置
                </el-button>
            </div>
        </el-card>
        <el-table v-loading="loading" :data="list" border style="width: 100%">
            <el-table-column fixed prop="id" label="用户编号" width="150">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="password" label="密码" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="用户类型" width="100">
                <template>
                    {{ sex == '1' ? '普通用户' : '工作人员' }}
                </template>
            </el-table-column>
            <el-table-column prop="ctime" label="创建日期" width="120">
            </el-table-column>
            <el-table-column prop="utime" label="更新日期" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button @click="dropdata(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination  @current-change="pagechange" background layout="prev, pager, next" :total="total" :page-size="pagesize">
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    async created() {
        let res = await axios({
            url: 'http://localhost:3000/user',
            method: 'get',
            params: {
                pagenumber: this.pagenumber,
                pagesize: this.pagesize
            }
        });
        console.log(res)
        this.list = res.data.data.list;
        this.total = res.data.data.total;
    },
    data() {
        return {
            list: [],
            pagenumber: 1,
            pagesize: 5,
            total: 0,
        };
    },
    mounted() {
        // 在组件挂载后设置定时器
        setTimeout(() => {
            this.loading = false; // 1秒后将loading设置为false
        }, 500); // 500毫秒 = 0.1秒
    },
    methods: {
        performSearch() {
            if (this.database.userId && this.database.username) {
                console.log("搜索用户ID:", this.database.userId);
                console.log("搜索用户名:", this.database.username);
                // 在这里执行搜索逻辑
            } else {
                // 如果用户 ID 或用户名为空，则提示用户
                this.$message({
                    type: 'warning',
                    message: '请同时输入用户ID和用户名进行搜索'
                });
            }
        },
        dropdata(row) {
            this.$confirm('确认删除这条记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 执行删除操作
                console.log('删除的数据:', row);
                this.$message({
                    type: 'success',
                    message: '删除成功!',

                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        resetSearch() {
            this.database.userId = '';
            this.database.username = '';
            // 这里可以添加其他重置逻辑
        }, handleClick(row) {
            console.log(row);
        }, async pagechange(pagenumber) {
            console.log(`页码改变了：${pagenumber}`);
            this.pagenumber = pagenumber
            // 重新请求数据
            const res = await axios({
                url: "http://localhost:3000/user",
                method: "get",
                // get
                params: {
                    pagenumber: this.pagenumber,
                    pagesize: this.pagesize,
                },
            });
            console.log(res);
            // 2.把得到的数据放在data下
            this.list = res.data.data.list;
            this.total = res.data.data.total;
        },
    },
}

</script>



<style scoped>
.top-bar {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
}

.search-input {
    flex-grow: 1;
    margin-right: 10px;
}
</style>