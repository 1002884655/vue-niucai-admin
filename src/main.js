// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ToolClass from './util/PublicMethod'
import VueScroller from 'vue-scroller'
import { Dialog, Toast } from 'vant'
import Es6Promise from 'es6-promise'

// import Vconsole from 'vconsole'

// let aVconsole = new Vconsole()
// console.log(aVconsole, `这个不用管`)

require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.use(VueScroller)

Vue.prototype.ToolClass = ToolClass

Vue.prototype.Dialog = Dialog
Vue.prototype.Toast = Toast

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
