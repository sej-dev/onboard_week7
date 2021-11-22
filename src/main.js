import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from "@/store";
import * as filters from "@/utils/filters";

Vue.config.productionTip = false

Vue.use(Vuex)

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')

require('@/assets/css/index.css')
require('@/assets/css/base.css')