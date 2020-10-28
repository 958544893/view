// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App' 	
import Cookies from 'js-cookie'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './icons'
import weui from 'weui.js'
import 'weui'
Vue.prototype.$weui = weui

Vue.use(ElementUI);

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
   render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
