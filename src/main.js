import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/scss/main.scss'
import Main from '@/components/Main'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
    {path: '/', name: 'Main', component: Main},
]

const router = new VueRouter({
    routes
})

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
