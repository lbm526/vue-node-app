import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import add from './components/add.vue'
import navBar from './components/navBar.vue'
import card from './components/card.vue'
import edit from './components/edit.vue'
import info from './components/info.vue'
import login from './components/users/login'
import register from './components/users/register'
import store from './store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            component: Home,
            
        },
        {
            path: '/about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/add',
            component: add,
            // 路由元组件，为导航守卫标识
            meta: {
                needLogin: true
            }
        },
        {
            path: '/navBar',
            component: navBar
        },
        {
            path: '/card',
            component: card,
            meta: {
                needLogin: true
            }
        },
        {
            path: '/edit',
            component: edit,
            meta: {
                needLogin: true
            }
        },
        {
            path: '/info',
            component: info
        },
        {
            path: '/users/login',
            component: login
        },
        {
            path: '/users/register',
            component: register
        },
    ]

})

// 全局导航守卫
router.beforeEach((to, from, next) => {
    if(to.meta.needLogin){
        if(store.state.userId){
            next();
        }else {
            next({
                path: '/users/login',
                query: {redirect: to.fullPath},//登陆成功之后，继续访问地址
            })
        }
    }else {
        next()
    }
})

export default router