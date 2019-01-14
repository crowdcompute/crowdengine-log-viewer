import Vue from 'vue'
import App from './App.vue'
import hdate from 'human-date'

Vue.config.productionTip = false

Vue.filter('humandate', val => new Date(val).toLocaleString())


new Vue({
  render: h => h(App),
}).$mount('#app')
