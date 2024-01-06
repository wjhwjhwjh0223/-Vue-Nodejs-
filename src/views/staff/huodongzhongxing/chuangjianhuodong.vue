<template>
    <div>
        <el-card>
            <div slot="header">
                <span>创建活动</span>
            </div>
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
                </el-form-item>

                <el-form-item label="活动描述">
                    <el-input type="textarea" v-model="form.description" placeholder="请输入活动描述"></el-input>
                </el-form-item>

                <el-form-item label="活动时间">
                    <el-date-picker v-model="form.time" type="datetime" placeholder="选择日期和时间"></el-date-picker>
                </el-form-item>

                <el-form-item label="活动地点">
                    <el-input v-model="form.location" placeholder="请输入活动地点"></el-input>
                </el-form-item>

                <el-form-item label="活动类型">
                    <el-radio-group v-model="form.activityType">
                        <el-radio label="社交活动">社交活动</el-radio>
                        <el-radio label="教育活动"></el-radio>
                        <el-radio label="音乐和舞蹈">音乐和舞蹈</el-radio>
                        <el-radio label="旅游和户外活动">旅游和户外活动</el-radio>
                        <el-radio label="健康与养生">健康与养生</el-radio>
                        <el-radio label="体育活动">体育活动</el-radio>
                        <el-radio label="其他">其他</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="参加人数">
                    <el-input-number v-model="form.participantCount" :min="1" label="参加人数"
                        placeholder="请输入参加人数"></el-input-number>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm">创建活动</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                staffId: '',
                name: '',
                description: '',
                time: '',
                location: '',
                activityType: '',
                participantCount: '',
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post('http://localhost:3000/activitycreat', this.form);
                if (response.data.code === 1) {
                    
                    this.$message({ type: 'success', message: '创建成功!' });
                    this.resetForm();
                } else {
                    this.$message({ type: 'error', message: response.data.msg || '创建失败!' });
                }
            } catch (error) {
                console.error('请求失败:', error);
                this.$message({ type: 'error', message: error.response.data.msg || '请求失败!' });
            }
        },
        resetForm() {
           this.form={
            staffId: '',
                name: '',
                description: '',
                time: '',
                location: '',
                activityType: '',
                participantCount: '',
           };
        },
    },
    created() {
        this.form.staffId = localStorage.getItem('userId'); 
        console.log('当前员工ID:', this.form.staffId);
    }
};
</script>




<style lang="scss" scoped></style>