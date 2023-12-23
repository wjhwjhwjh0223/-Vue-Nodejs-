<template>
  <el-card>
    <div slot="header">
      <span>用户添加</span>
    </div>
    <!-- 搜索区域 -->
    <el-form :inline="true">
      <el-form-item label="用户名">
        <el-input v-model="params.name" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="params.sex">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="search" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 新增用户按钮区域 -->
    <div class="row-box">
      <el-button @click="addOpen">新增用户</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <!-- 固定的写法，拿到当前行整个对象 -->
        <template #default="{ row }">
          {{ row.sex == 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template #default="{ row }">
          <!-- 0 ,1 ,2, 3, 4 -->
          {{ formatState(row.state) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="{row}">
          <el-button @click="handleClick(row)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="editRow(row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div class="row-box">
      <el-pagination
        @current-change="pagechange"
        background
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>

    <!-- 表单弹框 -->
    <!--  dialogFormVisible： 控制这个弹框的显示与隐藏 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <!-- 表单的数据 -->
      <!-- 表单容器 -->
      
      <!-- label-width： 规定label的宽度 -->
      <el-form :model="userFormData" class="demo-form-inline" label-width="120px">
        <!-- 表单项目 -->
        <el-form-item label="用户名">
          <!-- 表单控件 -->
          <el-input v-model="userFormData.name" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="userFormData.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="userFormData.state"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>

        <el-form-item>
          <el-button @click="submit">提交</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </el-card>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      // 搜索条件
      params: {
        name: "",
        sex: "",
      },
      // 分页信息
      pageInfo: {
        pagesize: 10,
        pagenum: 1,
      },
      list: [],
      // 控制弹框的显示与隐藏
      dialogFormVisible: false,
      userFormData: {
        // 用户名
        name: '',
        // 性别
        sex: 0,
        // 状态  0（关闭）  1（开启）
        state: 0,
      },
    };
  },
  methods: {
    // 编辑当前这一项
    editRow(row) {
      // 点击当前的项的数据
      this.dialogFormVisible = true;
      console.log(row)
      // 我把当前项的数据给userFormData ， userFormData又是跟页面的表单绑定在一起
      // js自带的拷贝方法
      // this.userFormData = {...row}
      this.userFormData = _.cloneDeep(row)
    },

    // 提交表单
    submit() {
      console.log(this.userFormData)
      console.log('将数据发给后台，后台告诉我新增成功了')
      console.log('弹框关闭')
      this.dialogFormVisible = false;
      console.log('重新发起请求，页面自然会多一条数据')
    },
    // 打开新增用户的表单弹框
    addOpen() {
      this.dialogFormVisible = true;
    },
    // 去搜索
    search() {
      console.log(`将条件发给后台：`, this.params);
    },
    // 页码变化
    pagechange(val) {
      console.log(val, "~~~~~~");
      this.pageInfo.pagenum = val;
      console.log(this.pageInfo);
    },

    formatState(state) {
      // 处理逻辑
      return state + "~~";
    },
  },
  // 生命周期
  created() {
    // 页面初始化完成（数据），页面还没有渲染完成
    // 通常会在这里请求数据

    setTimeout(() => {
      // 500毫秒之后，得到后端的数据
      let data = [
        {
          name: "张三1",
          sex: 1,
          // 0: 警用   1： 启用
          state: 0,
        },
        {
          name: "张三2",
          sex: 0,
          // 0: 警用   1： 启用
          state: 1,
        },
        {
          name: "张三3",
          sex: 0,
          // 0: 警用   1： 启用
          state: 0,
        },
      ];
      // 我先对后端的数据进行处理
      // data.forEach(function(item, index) {

      // })
      // data.forEach((item, index) => {
      //   item.sex = item.sex == 1 ? '男' : '女'
      //   item.state = item.state == 1 ? '启用' : '禁用'
      // })
      this.list = data;
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.row-box {
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 8px;
  justify-content: flex-end;
}
</style>
