/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './routes/Router'
import store from './data/index'
import Icon from 'vue-awesome'
import vuetify from './plugins/vuetify';



Vue.config.productionTip = false
Vue.component('v-icon',Icon);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
