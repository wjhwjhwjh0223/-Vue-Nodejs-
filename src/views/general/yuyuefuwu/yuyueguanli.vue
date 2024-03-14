<template>
    <div>
        <el-card>
            <div slot="header">
                <span>预约管理</span>
            </div>
            <div class="top-bar">
                <el-select v-model="params.serviceType" placeholder="请选择" @change="getAppointments">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="default" icon="el-icon-refresh" @click="resetSearch">
                    重置
                </el-button>
            </div>
            <el-table :data="appointments" style="width: 100%">
                <el-table-column prop="id" label="服务单号"></el-table-column>
                <el-table-column prop="serviceType" label="服务类型"></el-table-column>
                <el-table-column prop="serviceDescription" label="服务描述"></el-table-column>
                <el-table-column label="预约时间">
                    <template slot-scope="scope">
                        {{ formatDate(scope.row.appointmentTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="specialRequirements" label="特殊要求"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span :class="['status-bubble', `status-${scope.row.status}`]">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="staff.name" label="服务人员"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot:default="scope">
                        <el-button @click="openCancelDialog(scope.row)" size="mini"
                            v-if="scope.row.status !== '已取消' && scope.row.status !== '已完成'">
                            取消
                        </el-button>

                        <el-button
                            v-if="scope.row.status === '已取消' || scope.row.status === '已完成' || scope.row.status === '已评价'"
                            @click="closeService(scope.row)" size="mini">
                            关闭服务
                        </el-button>
                        <el-button v-else disabled size="mini">
                            关闭服务
                        </el-button>
                        <el-button v-if="scope.row.status === '已完成' && !scope.row.hasFeedback"
                            @click="openReviewDialog(scope.row)" size="mini">
                            评价
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="pagechange" background layout="prev, pager, next" :total="total"
                :page-size="pagesize">
            </el-pagination>
        </el-card>
        <!-- 评价对话框 -->
        <el-dialog title="提交评价" :visible.sync="showReviewDialog">
            <!-- 显示评分组件 -->
            <div class="block">
                <el-rate v-model="feedback.reviewRating" :colors="colors">
                </el-rate>
            </div>
            <el-input type="textarea" v-model="feedback.reviewContent" placeholder="请输入评价内容">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showReviewDialog = false">取消</el-button>
                <el-button type="primary" @click="submitReview">提交评价</el-button>
            </span>
        </el-dialog>
        <!-- 取消理由对话框 -->
        <el-dialog title="取消预约" :visible.sync="showCancelDialog">
            <el-input type="textarea" v-model="cancelReason" placeholder="请输入取消理由，如果不想说明理由请写无">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showReviewDialog = false">关闭</el-button>
                <el-button type="primary" @click="submitCancellation">提交取消</el-button>
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
            options: [
                { value: '家政服务', label: '家政服务' },
                { value: '医疗护理', label: '医疗护理' },
                { value: '餐饮服务', label: '餐饮服务' },
                { value: '健康监护', label: '健康监护' },
                { value: '休闲娱乐', label: '休闲娱乐' },
                { value: '心理咨询', label: '心理咨询' },
                { value: '交通服务', label: '交通服务' },
                { value: '教育学习', label: '教育学习' }
            ],
            params: {
                serviceType: ''
            },
            pagenumber: 1,
            pagesize: 5,
            total: this.total,
            showCancelDialog: false, // 新增状态变量控制取消对话框
            cancelReason: '', // 存储取消理由
            appointments: [], // 存储预约数据
            showReviewDialog: false,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            feedback: {
                reviewContent: '',
                reviewRating: 0,
            },
            currentAppointmentId: null, // 当前选中的预约服务的 ID
            currentstaffId: null
        }

    },
    methods: {
        pagechange(pagenumber) {
            //console.log(`页码改变了：${pagenumber}`);
            this.pagenumber = pagenumber
            // 重新请求数据
            this.getAppointments()
        },
        async performSearch() {
            //console.log("需要把以下的数据发给后端")
            //console.log(this.pagenumber, this.pagesize, this.params.username)
            this.getAppointments()

        },
        resetSearch() {
            // 重置 params 对象
            this.params.serviceType = '';
            this.getAppointments()
        },
        // 提交取消操作
        async submitCancellation() {
            if (!this.cancelReason.trim()) {
                this.cancelReason = '无'; // 如果未填写理由，则默认为'无'
            }
            try {
                console.log(this.cancelReason)
                await this.cancelAppointment({ id: this.currentAppointmentId }, this.cancelReason);
                this.$message.success('预约已取消');
            } catch (error) {
                this.$message.error('取消预约失败: ' + error);
            }

            this.showCancelDialog = false; // 关闭对话框
        },

        // 打开取消对话框
        openCancelDialog(appointment) {
            this.currentAppointmentId = appointment.id;
            this.showCancelDialog = true;
            this.cancelReason = ''; // 重置取消理由
        },

        //提交评价
        async submitReview() {
            if (this.feedback.reviewRating === 0) {
                this.$message.warning('请先选择评分');
                return;
            }
            if (!this.feedback.reviewContent.trim()) {
                this.$message.warning('评价内容不能为空');
                return;
            }
            // 构造要发送的数据
            const reviewData = {
                appointmentServiceId: this.currentAppointmentId,
                staffId: this.currentstaffId,
                feedback: {
                    rating: this.feedback.reviewRating,
                    comment: this.feedback.reviewContent
                }
            };
            console.log(reviewData);
            axios.post('http://localhost:3000/evaluationServices', reviewData)
                .then(response => {
                    this.$message.success('评价提交成功');
                    // await axios({
                    //     method:'post',
                    //     url:'http://localhost:3000/auditServices',
                    //     data:{
                    //         id: this.currentAppointmentId, 
                    //     }
                    // })
                    this.getAppointments();
                })
                .catch(error => {
                    this.$message.error('提交评价失败: ' + error);
                });

            this.showReviewDialog = false; // 提交后关闭对话框
        },
        //打开评价对话框
        openReviewDialog(appointment) {
            console.log(appointment);
            if (appointment.hasFeedback) {
                this.$message.warning('这个预约服务已经被评价过了');
                return;
            }
            this.currentAppointmentId = appointment.id;
            this.currentstaffId = appointment.staff.id;
            this.showReviewDialog = true;
            this.feedback.reviewContent = ''; // 重置评价内容
            this.feedback.reviewRating = '0' // 重置评分
        },

        //关闭服务
        async closeService(appointment) {
            await axios({
                url: 'http://localhost:3000/closeService',
                method: "post",
                data: {
                    id: appointment.id
                }
            })
            this.$message.success('已关闭服务');
            this.getAppointments();
        },

        //格式化时间
        formatDate(dateTime) {
            return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        },

        //取消服务
        cancelAppointment(appointment, reason) {
            // 确保返回 axios.post 调用的 Promise
            return axios.post('http://localhost:3000/cancelReservationService', {
                id: appointment.id,
                reason: reason
            })
                .then(response => {
                    // 处理响应
                    if (response.data.code === 1) {
                        this.getAppointments();
                    } else {
                        this.$message.error('取消预约失败: ' + response.data.msg);
                    }
                })
                .catch(error => {
                    // 处理错误
                    this.$message.error('请求错误: ' + error);
                    throw error; // 抛出错误以便可以在调用链中捕获
                });
        },

        //获取预约列表
        async getAppointments() {
            const userId = localStorage.getItem('userId');
            try {
                let res = await axios({
                    url: 'http://localhost:3000/getAListOfPersonalAppointmentServices',
                    method: 'get',
                    params: {
                        id: userId,
                        pagenumber: this.pagenumber,
                        pagesize: this.pagesize,
                        ...this.params // 包含搜索参数
                    }
                });
                // 正确引用 API 响应数据
                if (res.data.data && Array.isArray(res.data.data.list)) {
                    this.appointments = res.data.data.list;
                    this.total = res.data.data.total;
                    //console.log(this.appointments);
                } else {
                    console.error('Expected list not found in response:', res.data);
                    this.appointments = [];
                }
            } catch (error) {
                console.error("Error fetching appointment list:", error);
                this.appointments = [];
            }
        }
    },
    async created() {
        // 加载预约数据
        this.getAppointments();
    }
}
</script>

<style lang="scss" scoped>
.status-bubble {
    padding: 3px 10px;
    color: white;
    border-radius: 10px;
    text-align: center;
}

.status-待确认 {
    background-color: #ffcc00; // 黄色
}

.status-已通过 {
    background-color: #5cb85c; // 绿色
}

.status-已接取 {
    background-color: #0275d8; // 蓝色
}

.status-已完成 {
    background-color: #5bc0de; // 浅蓝色
}

.status-已取消 {
    background-color: #d9534f; // 红色
}

.status-已评价 {
    background-color: #ec1089; // 粉色
}

.status-已拒绝 {
    background-color: #6c757d; // 灰色
}
</style>

