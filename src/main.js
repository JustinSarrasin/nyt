// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// import vmApp from './app.vue'

// new Vue(vmApp).$mount('#app')
// import axios from 'axios'


Vue.config.productionTip = false

new Vue({
  // el: '#app',
  render: h => h(App),
}).$mount('#app')
