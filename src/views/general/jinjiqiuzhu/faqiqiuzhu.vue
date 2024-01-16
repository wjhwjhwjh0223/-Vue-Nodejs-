<template>
    <div>
        <el-card>
            <div slot="header">
                <span>发起求助</span>
            </div>
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="紧急情况描述">
                    <el-input type="textarea" v-model="form.details"></el-input>
                </el-form-item>
                <el-form-item label="紧急类型">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option label="医疗紧急情况" value="medical"></el-option>
                        <el-option label="安全事件" value="safety"></el-option>
                        <el-option label="其他紧急情况" value="other"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="位置信息">
                    <el-input v-model="form.location" placeholder="请输入位置"></el-input>
                </el-form-item>
                <el-form-item label="选择工作人员">
                    <el-select v-model="form.selectedStaff" filterable placeholder="请选择工作人员" multiple>
                        <el-option v-for="staff in staffList" :key="staff.id" :label="staff.name" :value="staff.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交求助</el-button>
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
                details: '',
                type: '',
                location: '',
                selectedStaff: []  // 存储选中的工作人员ID
            },
            emergencyDescription: '',
            urgencyLevel: '',
            staffList: [] // 工作人员列表
        };
    },
    mounted() {
        this.fetchStaffList();
    },
    methods: {
        async fetchStaffList() {
            let res = await axios({
                url: 'http://localhost:3000/staffList',
                method: 'get',
            })
            this.staffList = res.data.data
            console.log(this.staffList, '111111111111111');
        },
        submitForm() {
            console.log('求助信息', this.form);
            // 提交表单的逻辑
        },
    },
}
</script>

<style lang="scss" scoped></style>
