import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import '@styles/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)
Vue.use(ElementUI, { size: 'small' })

import * as plugins from '@/plugins'
Object.keys(plugins).forEach(key => {
  Vue.use(plugins[key])
})

// icon
import './icons'

// import 'tailwindcss/tailwind.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
