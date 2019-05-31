<template>
    <div id="edit">
        <div v-for="text in error" v-if="showError">
            <div class="alert alert-danger">{{text}}</div>
        </div>
        <div class="card card-body">
            <h3>想学的课程</h3>
            <!--<form action="api/card" method="post">-->
            <div class="form-group">
                <label for="title">标题</label>
                <input id="title" type="text" class="form-control" name="title" v-model="title">
            </div>
            <div class="form-group">
                <label for="details">详情</label>
                <textarea id="details" class="form-control" name="details" v-model="details"></textarea>
            </div>
            <button type="button" class="btn btn-primary" @click="editClass()">修改</button>
            <!--</form>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "edit",
        data() {
            return {
                showError: false,
                error: [],
                title: '',
                details: '',
                id: this.$route.query.id
            }
        },
        mounted: function () {
            if(this.id){
                sessionStorage.setItem('autoSave',this.id);
            }
            this.$store.state.success_msg = '';
            let id = sessionStorage.getItem('autoSave');
            this.axios.get('/api/card',{
               params: {userId: this.$store.state.userId}
            })
                .then(res => {
                console.log('课程内容', res);
                this.title = res.data[0].title;
                this.details = res.data[0].details;
                this.id = this.$route.query.id
            })
        },
        methods: {
            editClass() {
                const _this = this;
                this.axios.post('/api/editCurriculum', {
                    id: this.id,
                    title: this.title,
                    details: this.details,
                }).then(function (value) {
                    _this.$store.state.success_msg = '修改成功';
                    _this.$router.push('/card');
                })
            }
        }
    }
</script>

<style scoped>

</style>