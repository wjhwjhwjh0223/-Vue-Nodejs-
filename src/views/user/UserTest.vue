<template>
    <div>
        用户测试
    </div>
</template>

<script>
import axios from 'axios'
export default {
    async created() {
        console.log('用户测试')
        let res = await axios({
            url: 'http://localhost:3000/user',
            method: 'get'
        })
        console.log(res)
    },
}
</script>

<style lang="scss" scoped></style>