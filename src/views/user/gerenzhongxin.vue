<template>
    <el-container>
        <el-aside width="300px" style="background-color: #f2f2f5; padding: 20px;">
            <!-- 头像和姓名 -->
            <el-image style="border-radius: 50%; width: 100px; height: 100px; margin: 0 auto;"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fabf9e746-a09c-4b08-bcba-1e347a370226%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1705931166&t=e14ea8b2e19ef3bfebf000a493a92dca"
                fit="cover"></el-image>
            <p style="text-align: center; margin-top: 20px;">吴骏浩</p>

            <!-- 个人信息描述列表 -->
            <el-descriptions column="1" style="margin-top: 20px;">
                <el-descriptions-item label="职业">前端开发</el-descriptions-item>
                <el-descriptions-item label="公司">xxx</el-descriptions-item>
                <el-descriptions-item label="位置">重庆</el-descriptions-item>
                <el-descriptions-item label="特别">男</el-descriptions-item>
                <el-descriptions-item label="毕业院校">重庆科技大学</el-descriptions-item>
                <el-descriptions-item label="邮箱">junjun02223@outlook.com</el-descriptions-item>
                <el-descriptions-item label="联系方式">wx:junjun010223</el-descriptions-item>
                <el-descriptions-item label="技术栈">JavaScript, HTML, CSS, Vue, Node, React</el-descriptions-item>
            </el-descriptions>

            <!-- 编辑资料按钮 -->
            <div style="text-align: center; margin-top: 20px;">
                <el-button type="primary">编辑资料</el-button>
            </div>
        </el-aside>

        <el-main>
            <!-- 个性签名 -->
            <div class="profile-section">
                <p>原神!启动!</p>
            </div>
            <!-- 最喜欢的一句 -->
            <div class="profile-section">

                <blockquote>开心每一天</blockquote>
            </div>

            <!-- 座右铭或格言 -->
            <div class="profile-section">
                <p>只有经历过地狱的磨炼，才能炼就创造天堂的力量；只有流过血的手指，才能弹出世间的绝唱。</p>
            </div>
            <el-row>
                <el-button type="primary" icon="el-icon-thumb" circle @click="handleUpvote"></el-button>
                <el-button type="success" icon="el-icon-star-on" circle @click="handleFavorite"></el-button>
                <el-button type="info" icon="el-icon-share" circle @click="handleShare"></el-button>
            </el-row>

        </el-main>
    </el-container>
</template>
  

<script>
export default {

};
</script>

<style scoped>
.profile-section {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.el-aside {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.el-main {
    padding: 0 20px;
}
</style>
  