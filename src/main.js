import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 设置组件的语言为中文
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

Vue.config.productionTip = false

Vue.use(Antd);

// router.beforeEach((to, from,next) => {
//     console.log(to);
//     console.log(from);
//     next();
// })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
