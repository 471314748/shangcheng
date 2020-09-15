import Vue from 'vue'
import App from './App'

// 请求封装注入vue实例的原型
import request from './utils/request.js'
Vue.prototype.$request = request

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
