import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import fastclick from 'fastclick'
import topTip from 'components/top-tip'

import './assets/style/reset.css'
import './assets/style/border.css'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.component('top-tip', topTip)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
