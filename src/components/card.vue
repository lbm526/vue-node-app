<template>
    <div>
        <div class="card card-body mb-2" v-if="curriculum">
            <div v-for="item in curriculum">
                <h4>{{item.title}}</h4>
                <p>{{item.details}}</p>
                <router-link :to="{path:'/edit',query:{id: item._id}}" class="btn btn-dark btn-block">编辑</router-link>

                <input type="button" @click="deleteText(item._id)" class="btn btn-danger btn-block" value="删除">
            </div>

        </div>
        <p v-else>还没有任何想学的课程!</p>
    </div>
</template>

<script>
    export default {
        name: "card",
        inject: ['reload'],
        data() {
            return {
                showCard: false,
                curriculum: []
            }
        },
        mounted: function () {
            console.log(this.$store.state.userId)
            this.axios.get('/api/card',{
               params: {userId: this.$store.state.userId}
            }).then(res => {
                    console.log('课程', res);
                    if (res.status === 200 && res.data.length > 0) {
                        this.showCard = true;
                        this.curriculum = res.data;
                    }
                })
        },
        methods: {
            //获取数据
            getText() {
                this.axios.get('/api/card')
                    .then(res => {
                        console.log('课程', res);
                        if (res.status === 200 && res.data.length > 0) {
                            this.showCard = true;
                            this.curriculum = res.data;
                        }
                    })
            },
            //删除数据
            deleteText(id) {
                const _this = this;
                this.axios.post('/api/deleteCurriculum', {
                    _id: id,
                }).then(res => {
                    _this.axios.get('/api/card')
                        .then(res => {
                            this.$store.state.success_msg = '删除成功';
                            console.log('课程', res);
                            if (res.data.length > 0) {
                                this.showCard = true;
                            } else {
                                this.showCard = false;
                            }
                            this.curriculum = res.data;
                        })
                })
            }
        }
    }
</script>

<style scoped>

</style>