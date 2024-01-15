<template>
    <div>
        <el-card>
            <div slot="header">
                <span>个人信息</span>
            </div>
            <el-divider><span>个人档案</span></el-divider>
            <el-descriptions v-if="general">
                <el-descriptions-item label="姓名">{{ general.name }}</el-descriptions-item>
                <el-descriptions-item label="账号">{{ general.account }}</el-descriptions-item>
                <el-descriptions-item label="头像">
                    <img :src="general.avatar" alt="头像" style="width: 100px; height: 100px;">
                </el-descriptions-item>
                <el-descriptions-item label="年龄">{{ general.age }}</el-descriptions-item>
                <el-descriptions-item label="性别">{{ general.sex === 1 ? '男' : '女' }}</el-descriptions-item>
                <el-descriptions-item label="电话">{{ general.phone }}</el-descriptions-item>
                <el-descriptions-item label="地址">{{ general.address }}</el-descriptions-item>
                <el-descriptions-item label="紧急联系人电话">{{ general.contacts }}</el-descriptions-item>
                <el-descriptions-item label="注册时间">{{ formatDateTime(general.ctime) }}</el-descriptions-item>
                <el-descriptions-item label="更新时间">{{ formatDateTime(general.utime) }}</el-descriptions-item>
            </el-descriptions>
            <el-divider><span>健康档案</span></el-divider>
            <el-descriptions v-if="health">
                <el-descriptions-item label="健康档案ID">{{ health.id }}</el-descriptions-item>
                <el-descriptions-item label="健康信息">{{ health.health }}</el-descriptions-item>
                <el-descriptions-item label="病史详情">{{ health.medical }}</el-descriptions-item>
                <el-descriptions-item label="出生日期">{{ formatDateTime(health.dob) }}</el-descriptions-item>
            </el-descriptions>
            <div>
                <el-button type="primary" @click="openEditGeneralDialog()">编辑个人信息</el-button>
                <el-button type="primary" @click="openEditHealthDialog()">编辑健康档案</el-button>
            </div>
        </el-card>
        <!-- 修改个人信息弹窗 -->
        <el-dialog :visible.sync="showEditGeneralDialog" title="编辑用户信息">
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
                <el-form-item label="紧急联系人">
                    <el-input v-model="editFormData.contacts"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showEditGeneralDialog = false">取消</el-button>
                <el-button type="primary" @click="submitForm">保存</el-button>
            </span>
        </el-dialog>
        <!--编辑健康档案弹窗-->
        <el-dialog :visible.sync="showEditHealthDialog" title="编辑健康档案信息">
            <el-form :model="healthData">
                <el-form-item label="出生日期">
                    <el-input v-model="healthData.dob"></el-input>
                </el-form-item>
                <el-form-item label="健康信息">
                    <el-input v-model="healthData.health"></el-input>
                </el-form-item>
                <el-form-item label="病史详情">
                    <el-input v-model="healthData.medical"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showEditHealthDialog = false">取消</el-button>
                <el-button type="primary" @click="submithealthData">保存</el-button>
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
            showEditGeneralDialog: false,
            showEditHealthDialog: false,
            general: null,
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
        //查询个人健康档案
        async fetchhealthData() {
            const generalId = localStorage.getItem('userId');
            let res = await axios({
                url: 'http://localhost:3000/getHealth',
                method: 'get',
                params: {
                    generalId: generalId
                }
            })
            this.health = res.data.data;
        },
        //修改个人健康信息
        async submithealthData() {
            const userId = localStorage.getItem('userId');
            const healthData = this.healthData;
            // 确保健康档案数据中包含用户ID
            healthData.generalId = userId;
            console.log(healthData)
            try {
                const response = await axios.post('http://localhost:3000/updateHealth', healthData);
                if (response.data.code === 1) {
                    this.$message.success(response.data.msg || '健康档案更新成功');

                } else {
                    this.$message.error(response.data.msg || '更新失败');
                }
            } catch (error) {
                this.$message.error('请求失败: ' + error.message);
            }
            // 关闭弹窗
            this.showEditHealthDialog = false;
        },

        //打开健康档案编辑弹窗
        openEditHealthDialog() {
            this.healthData = Object.assign({}, this.health);
            this.showEditHealthDialog = true
        },

        success(res) {
            this.editFormData.avatar = res.data;
        },
        //提交用户信息
        async submitForm() {
            try {
                const response = await axios.post('http://localhost:3000/generalUpdate', this.editFormData);
                if (response.data.code === 1) {
                    this.$message.success(response.data.msg || '保存成功');
                    this.fetchUserData();
                    this.showEditGeneralDialog = false;
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
        openEditGeneralDialog() {
            // 使用Object.assign复制对象，避免直接绑定，这样用户在编辑表单时不会影响原始数据
            this.editFormData = Object.assign({}, this.general);
            this.showEditGeneralDialog = true;
        },
        fetchUserData() {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('用户ID未找到');
                return;
            }
            axios.get(`http://localhost:3000/general/${userId}`)
                .then(response => {
                    if (response.data && response.data.code === 1) {
                        this.general = response.data.data;
                        console.log('获取用户数据成功:', this.general);
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
  