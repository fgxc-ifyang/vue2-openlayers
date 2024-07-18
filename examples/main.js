import Vue from 'vue'
import App from './App.vue'
import VueOpenlayers from './../packages/index'
import * as echarts from 'echarts';



// Vue.prototype.$numeral = require('numeral');
// Vue.prototype.parseTime = parseTime;
 
Vue.use(VueOpenlayers);



// 创建一个事件总线

let bus = new Vue();
Vue.prototype.$bus = bus;
window.bus = bus;

// 全局方法挂载
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
