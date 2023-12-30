<template>
    <div>
        <el-card>
            <div slot="header">
                <span>老人列表</span>
            </div>
            <div class="top-bar">
                <el-input v-model="params.name" placeholder="输入用户名" class="search-input" @keyup.enter="performSearch">
                </el-input>
                <el-button type="primary" icon="el-icon-search" @click="performSearch">
                    搜索
                </el-button>
                <el-button type="default" icon="el-icon-refresh" @click="resetSearch">
                    重置
                </el-button>
            </div>
            <el-table :data="list" border style="width: 100%">
                <el-table-column fixed prop="id" label="用户id">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        {{ scope.row.sex == '1' ? '男' : '女' }}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="phone" label="电话号码">
                </el-table-column>
                <el-table-column prop="contacts" label="紧急联系人">
                </el-table-column>
                <el-table-column prop="ctime" label="创建日期" width="120">
                </el-table-column>
                <el-table-column prop="utime" label="更新日期" width="120">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button @click="dropdata(scope.row.id)" type="text" size="small">删除</el-button>
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
            params: {
                name: ''
            }
        };
    },
    methods: { //删除数据
        async dropdata(id) {
            let res = await axios({
                url: 'http://localhost:3000/generalDelete',
                method: 'post',
                //data是个对象
                data: { id: id }
            })
            this.getparms()
        },
        async performSearch() {
            console.log("需要把以下的数据发给后端")
            console.log(this.pagenumber, this.pagesize, this.params.username)
            this.getparms()
            // 在这里执行搜索逻辑
        },
        resetSearch() {
            // 重置 params 对象
            this.params.name = '';
            this.getparms()
        },
        onSubmit() {
            console.log('submit!');
        }, handleClick(row) {
            console.log(row);
        },
        //获取参数
        async getparms() {
            let res = await axios({
                url: 'http://localhost:3000/general',
                method: 'get',
                params: {
                    pagenumber: this.pagenumber,
                    pagesize: this.pagesize,
                    ...this.params // 包含搜索参数
                }
            })
            console.log(res, '---------------')
            this.list = res.data.data.list
            this.total = res.data.data.total;
        }, pagechange(pagenumber) {
            console.log(`页码改变了：${pagenumber}`);
            this.pagenumber = pagenumber
            // 重新请求数据
            this.getparms()
        }
    }
}
</script>

<style  scoped>
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