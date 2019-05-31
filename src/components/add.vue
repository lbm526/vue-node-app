<template>
    <div id="add">
        <div v-for="text in error">
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
                <button type="button" class="btn btn-primary" @click="getpost()">提交</button>
            <!--</form>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "add",
        data(){
            return {
                title: '',
                details: '',
                showError: false,
                error: []
            }
        },
        methods:{
            getpost(){
                let _this = this;
                this.error = [];
                if(this.title == ''){
                    this.showError = true;
                    this.error.push('请输入标题');
                }
                if(this.details == ''){
                    this.showError = true;
                    this.error.push('请输入详情');
                }
                if(this.title && this.details){
                    this.axios.post('/api/add',{
                        title:this.title,
                        details:this.details,
                        userId: this.$store.state.userId
                    }).then(res=> {
                        this.$store.state.success_msg = '添加成功';
                    //跳转到card页面
                        _this.$router.push('/card');
                })
                }
            }
        }
    }
</script>

<style scoped>
#add{
    text-align: left;
}
</style>