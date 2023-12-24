<template>
    <div>
        <el-card>
            <div slot="header">
                <span>人员分配</span>
            </div>
        </el-card>
        <el-container>
            <el-main>
                <el-row>
                    <el-col :span="12">
                        <h3>人员列表</h3>
                        <el-input placeholder="搜索人员" v-model="searchPerson" />
                        <el-table :data="filteredPersons" style="width: 100%">
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <el-table-column prop="position" label="职位"></el-table-column>
                            <el-table-column prop="status" label="状态"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="startAssign(scope.row)">分配</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="12">
                        <h3>任务列表</h3>
                        <el-select v-model="selectedTask" placeholder="选择任务">
                            <el-option v-for="task in tasks" :key="task.id" :label="task.name" :value="task.id">
                            </el-option>
                        </el-select>
                        <el-table :data="tasks" style="width: 100%">
                            <el-table-column prop="name" label="任务名称"></el-table-column>
                            <el-table-column label="已分配人员">
                                <template slot-scope="scope">
                                    {{ scope.row.assigned }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-button type="primary" @click="confirmAssignment">确认分配</el-button>
            </el-main>
        </el-container>
    </div>
</template>


<script>
export default {
    data() {
        return {
            searchPerson: '',
            selectedTask: null,
            persons: [/* 人员数据 */],
            tasks: [/* 任务数据 */],
        };
    },
    computed: {
        filteredPersons() {
            if (this.searchPerson) {
                return this.persons.filter(person =>
                    person.name.includes(this.searchPerson)
                );
            }
            return this.persons;
        },
    },
    methods: {
        startAssign(person) {
            // 将选定的人员与任务关联起来的逻辑
        },
        confirmAssignment() {
            // 确认分配操作，并将数据保存至后端的逻辑
        },
    },
};
</script>