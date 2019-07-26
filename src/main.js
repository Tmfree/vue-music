import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './utils/rem'
import './assets/css/reset.css'
import './assets/css/all-icon.scss'
import './assets/css/basc.css'
import './registerServiceWorker'
import './assets/css/resetvant.scss'
Vue.use(VueLazyload, {
  loading: require('./assets/default.png'),
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
