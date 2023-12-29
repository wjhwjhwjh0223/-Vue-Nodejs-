<template>
    <div>
        <el-card>
            <div slot="header">
                <span>用户列表</span>
            </div>
            <div class="top-bar">
                <el-input v-model="params.username" placeholder="输入用户名" class="search-input" @keyup.enter="performSearch">
                </el-input>
                <el-button type="primary" icon="el-icon-search" @click="performSearch">
                    搜索
                </el-button>
                <el-button type="default" icon="el-icon-refresh" @click="resetSearch">
                    重置
                </el-button>
            </div>
        </el-card>
        <el-table :data="list" border style="width: 100%">
            <el-table-column fixed prop="id" label="用户编号" width="150">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="password" label="密码" width="120">
            </el-table-column>
            <el-table-column prop="genre" label="用户类型" width="100">
                <template slot-scope="scope">
                    {{ scope.row.genre == '1' ? '普通用户' : '工作人员' }}
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
                    <el-button @click="dropdata(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
            :page-size="pagesize">
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    async created() {
        this.getparms()
    },
    data() {
        return {

            list: [],
            pagenumber: 1,
            pagesize: 5,
            total: this.total,
            //搜索条件
            params: {
                username: ''
            }
        };
    },
    methods: {
        //删除数据
        async dropdata(id){
          let res =await axios({
                url:'http://localhost:3000/userDelete',
                method:'post',
                //data是个对象
                data:{id:id}
            })
            this.getparms()
        },
        //获取参数
        async getparms() {

            const res = await axios({
                url: "http://localhost:3000/user",
                method: "get",
                // get
                params: {
                    pagenumber: this.pagenumber,
                    pagesize: this.pagesize,
                    ...this.params // 包含搜索参数
                },
            });
            console.log(res);
            // 2.把得到的数据放在data下
            this.list = res.data.data.list;
            this.total = res.data.data.total;

        },
        //点击搜索
        async performSearch() {
            console.log("需要把以下的数据发给后端")
            console.log(this.pagenumber, this.pagesize, this.params.id, this.params.username)
            this.getparms()
            // 在这里执行搜索逻辑
        },
        pagechange(pagenumber) {
            console.log(`页码改变了：${pagenumber}`);
            this.pagenumber = pagenumber
            // 重新请求数据
            this.getparms()
        },resetSearch() {
        // 重置 params 对象
        this.params.username = '';
        this.getparms()
    },
    },
    handleClick(row) {
        console.log(row);

    }
}
</script>



<style scoped>
.top-bar {
    display: flex;
    align-items: center;
    padding: 10px;

}

.search-input {

    margin-right: 10px;
    width: 30%;
    padding-right: 100px;
}
</style>