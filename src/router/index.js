import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/components/welcome/welcome'
import result from '@/components/result/result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/result',
      name: 'result',
      component: result
    }
  ]
})
