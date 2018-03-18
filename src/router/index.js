import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Senadores from '@/components/Senadores'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'senadores',
      component: Senadores
    }
  ]
})
