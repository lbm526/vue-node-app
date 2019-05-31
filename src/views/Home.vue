<template>
    <div class="home">
        <div class="jumbotron text-center">
            <h1 class="display-8">{{title}}</h1>
            <p class="lead">这是一个添加收藏课程的小练习，用来玩vue+node+mongodb部署到heroku</p>
            <p class="lead">喜欢可以在github给个Star哦</p>
            <router-link to="/add" class="btn btn-dark btn-lg">添加新课程</router-link>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'home',
        data() {
            return {
                title: '欢迎您，帅哥美女'
            }
        },
        components: {}
    }
</script>
