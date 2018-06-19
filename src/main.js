// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AtComponents from 'at-ui'
// import 'at-ui-style'
import Vuex from 'vuex'
import VueResource from "vue-resource";
import App from './App'
import router from './router'
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(AtComponents)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    keywords:null,
    currentRecords:null,
    activateRecord:null
  },
  mutations: {
    updateKeywords(state, keywords) {
      state.keywords = keywords
    },
    updateRecords(state, records) {
      state.currentRecords = records
    },
    activateRecord(state,record) {
      state.activateRecord = record
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
