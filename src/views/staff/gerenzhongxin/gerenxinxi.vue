<template>
    <div>
        <el-card>
            <div slot="header">
                <span>个人信息</span>
            </div>
            <el-descriptions v-if="staff">
                <el-descriptions-item label="姓名">{{ staff.name }}</el-descriptions-item>
                <el-descriptions-item label="账号">{{ staff.account }}</el-descriptions-item>
                <el-descriptions-item label="头像">
                    <img :src="staff.avatar" alt="头像" style="width: 100px; height: 100px;">
                </el-descriptions-item>
                <el-descriptions-item label="年龄">{{ staff.age }}</el-descriptions-item>
                <el-descriptions-item label="性别">{{ staff.sex === 1 ? '男' : '女' }}</el-descriptions-item>
                <el-descriptions-item label="电话">{{ staff.phone }}</el-descriptions-item>
                <el-descriptions-item label="地址">{{ staff.address }}</el-descriptions-item>
                <el-descriptions-item label="注册时间">{{ formatDateTime(staff.ctime) }}</el-descriptions-item>
                <el-descriptions-item label="更新时间">{{ formatDateTime(staff.utime) }}</el-descriptions-item>
            </el-descriptions>
            <div>
                <el-button type="primary" @click="openEditstaffDialog()">编辑个人信息</el-button>
            </div>
        </el-card>
        <!-- 修改个人信息弹窗 -->
        <el-dialog :visible.sync="showEditstaffDialog" title="编辑用户信息">
            <el-form :model="editFormData">
                <el-form-item label="用户ID">
                    <el-input v-model="editFormData.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="editFormData.name"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <el-upload class="avatar-uploader" action="http://localhost:3000/file" :show-file-list="false"
                        :on-success="success">
                        <!-- 上传成功了就显示图片 -->
                        <img v-if="editFormData.avatar" :src="editFormData.avatar" class="avatar">
                        <!-- 上传之前就显示加号 -->
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="editFormData.age" type="number"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editFormData.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="editFormData.address"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                    <el-input v-model="editFormData.phone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showEditstaffDialog = false">取消</el-button>
                <el-button type="primary" @click="submitForm">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
import axios from 'axios';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            showEditstaffDialog: false,
            staff: null,
            editFormData: {},
            healthData: {},
            health: null
        };
    },
    created() {
        this.fetchUserData();
        this.fetchhealthData();
    },
    methods: {
        success(res) {
            this.editFormData.avatar = res.data;
        },
        //提交用户信息
        async submitForm() {
            try {
                const response = await axios.post('http://localhost:3000/staffUpdate', this.editFormData);
                if (response.data.code === 1) {
                    this.$message.success(response.data.msg || '保存成功');
                    this.fetchUserData();
                    this.showEditstaffDialog = false;
                } else {
                    this.$message.error(response.data.msg || '保存失败');
                }
            } catch (error) {
                if (error.response) {
                    const errorMsg = error.response.data && error.response.data.msg
                        ? error.response.data.msg
                        : '添加失败';
                    this.$message.error(errorMsg);
                }
            }
        },
        //用户控制显示弹窗
        openEditstaffDialog() {
            // 使用Object.assign复制对象，避免直接绑定，这样用户在编辑表单时不会影响原始数据
            this.editFormData = Object.assign({}, this.staff);
            this.showEditstaffDialog = true;
        },
        fetchUserData() {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('用户ID未找到');
                return;
            }
            axios.get(`http://localhost:3000/staff/${userId}`)
                .then(response => {
                    if (response.data && response.data.code === 1) {
                        this.staff = response.data.data;
                        console.log('获取用户数据成功:', this.staff);
                    } else {
                        console.error('查询失败:', response.data.msg);
                    }
                })
                .catch(error => {
                    console.error('请求错误:', error);
                });
        },
        formatDateTime(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        }
    }
};
</script>
  
<style lang="scss" scoped>
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
  