<template>
    <div class="row">
        <div class="col-md-6 mx-auto">
            <div class="card card-body">
                <div class="text-center">
                    <img class="logo" src="../../assets/logo.jpg">
                </div>
                <h3 class="text-center">登陆</h3>
                <div class="form-group">
                    <label for="email">邮箱</label>
                    <input type="email" name="email" v-model="email" id="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" name="password" v-model="password" id="password" class="form-control"
                        required>
                </div>
                <div class="text-center">
                    <button type="button" class="btn btn-primary" @click="login()">登陆</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                email: '',
                password: '',
                userId: this.$store.state.userId
            }
        },
        mounted() {
        },
        methods: {
            login() {
                if (!this.email) {
                    this.$store.state.error_msg.push('请输入邮箱');
                }
                if (!this.password) {
                    this.$store.state.error_msg.push('请输入密码');
                }
                if (this.email && this.password) {
                    this.axios.post('/api/users/login', {
                        email: this.email,
                        password: this.password
                    }).then(res => {
                        this.$store.state.success_msg = '';
                        this.$store.state.error_msg = [];
                        if (res.status === 200) {
                            if (res.data.msg ==='登陆成功') {
                                console.log(res)
                                this.$store.state.success_msg = '登陆成功';
                                this.$store.state.loginState = res.data.loginState;
                                sessionStorage.setItem('userInof',JSON.stringify(res.data.userId));
                                this.$store.state.userId = JSON.parse(sessionStorage.getItem('userInof'));
                                if(this.$route.query.redirect){
                                    const active = this.$route.query.redirect;
                                    this.$router.push(active);
                                }else {
                                    console.log('adgahd')
                                    this.$router.push('/card');
                                }
                                
                            } else {
                                this.$store.state.error_msg.push(res.data.msg);
                            }
                        }
                    })
                }
            }
        },
    }
</script>

<style scoped>
    .logo {
        width: 150px;
        height: 150px;
    }
</style>