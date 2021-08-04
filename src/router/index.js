import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/html'
}, {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
        path: '/html',
        component: () =>
            import ('../components/view/html.vue')
    }]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router