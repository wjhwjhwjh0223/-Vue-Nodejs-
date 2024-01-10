<template>
    <div>
        <el-card>
            <div slot="header">
                <span>申请预约服务</span>
            </div>
            <el-container>
                <el-main>
                    <el-form :model="appointment" label-position="top">
                        <el-form-item label="服务类型">
                            <el-select v-model="appointment.serviceType" placeholder="请选择">
                                <el-option label="家政服务" value="家政服务"></el-option>
                                <el-option label="医疗护理" value="医疗护理"></el-option>
                                <el-option label="餐饮服务" value="餐饮服务"></el-option>
                                <el-option label="健康监护" value="健康监护"></el-option>
                                <el-option label="休闲娱乐" value="休闲娱乐"></el-option>
                                <el-option label="心理咨询" value="心理咨询"></el-option>
                                <el-option label="交通服务" value="交通服务"></el-option>
                                <el-option label="教育学习" value="教育学习"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="服务描述">
                            <el-input type="textarea" v-model="appointment.serviceDescription"
                                placeholder="请输入服务的详细描述"></el-input>
                        </el-form-item>
                        <el-form-item label="预约时间">
                            <el-date-picker v-model="appointment.appointmentTime" type="datetime" placeholder="选择日期和时间"
                                value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="特殊要求">
                            <el-input type="textarea" v-model="appointment.specialRequirements"
                                placeholder="如果您有任何特殊要求，请在此说明"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">提交预约</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            appointment: {
                generalId: '',
                serviceType: '',
                serviceDescription: '',
                specialRequirements: '',
                appointmentTime: '', // 用于存储时间
            }
        };
    },
    methods: {
        //合并时间
        async submitForm() {
            try {
                const response = await axios.post('http://localhost:3000/appointmentServiceCreation', this.appointment);
                console.log(response);
                if (response.data.code === 1) {

                    this.$message({ type: 'success', message: '预约成功!' });
                    this.resetForm();
                } else {
                    this.$message({ type: 'error', message: response.data.msg || '预约失败!' });
                }
            } catch (error) {
                console.error('请求失败:', error);
                this.$message({ type: 'error', message: error.response.data.msg || '请求失败!' });
            }
        },
        resetForm() {
            this.appointment = {
                generalId: '',
                serviceType: '',
                serviceDescription: '',
                specialRequirements: '',
                appointmentDate: '',
                appointmentTime: '',
            };
        },
    },
    created() {
        this.appointment.generalId = localStorage.getItem('userId');
        console.log('当前用户id:', this.appointment.generalId);
    }
};
</script>

<style lang="scss" scoped></style>