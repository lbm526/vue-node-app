<template>
    <div class="row">
        <div class="col-md-6 mx-auto">
            <div class="card card-body">
                <div class="text-center">
                    <img class="logo" src="../../assets/logo.jpg">
                </div>
                <h3 class="text-center">注册</h3>
                <div class="form-group">
                    <label for="name">用户名</label>
                    <input type="text" name="name" id="name" class="form-control" v-model="name" required>
                </div>
                <div class="form-group">
                    <label for="email">邮箱</label>
                    <input type="email" name="email" id="email" class="form-control" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="password1">密码</label>
                    <input type="password" name="password1" id="password1" v-model="password1" class="form-control"
                        required>

                </div>
                <div class="form-group">
                    <label for="password2">确认密码</label>

                    <input type="password" name="password2" id="password2" v-model="password2" class="form-control"
                        required>

                </div>
                <div class="text-center">
                    <button type="button" class="btn btn-primary" @click="register()">注册</button>
                </div>
            </div>
        </div>
        <!--模态框-->
        <div id="modal" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog"
            aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3 class="text-center">{{error_text}}</h3>
                    </div>
                    <div class="modal-footer">
                        <div class="text-center">
                            <button class="btn btn-info" data-dismiss="modal" @click="closeModal()">关闭</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "regiter",
        data() {
            return {
                name: "",
                email: "",
                password1: "",
                password2: "",
                error_text: ""
            };
        },
        methods: {
            register() {
                if (this.password1 !== this.password2) {
                    this.$store.state.error_msg.push("密码不一致") ;
                    return false;
                }
                let _this = this;
                this.axios
                    .post("/api/users/register", {
                        userName: this.name,
                        email: this.email,
                        password: this.password1
                    })
                    .then(function (res) {
                        console.log(res);
                        if (res.data !== "") {
                            $("#modal").modal("show");
                            _this.error_text = res.data.msg;

                        }
                    });
            },
            closeModal() {
                if (this.error_text.indexOf('注册成功') >= 0) {
                    this.$router.push('/users/login');
                }
            }
        }
    };
</script>

<style scoped>
.logo {
        width: 150px;
        height: 150px;
    }
</style>