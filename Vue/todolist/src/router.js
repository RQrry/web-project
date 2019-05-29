import Vue from 'vue'
import Router from 'vue-router'
import Sign from './views/Sign.vue'
import Home from './views/Home.vue'
import Add from './views/Add.vue'
import List from './views/List.vue'
import User from './views/User.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'sign',
      component: Sign
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'list',
          name: 'list',
          component: () => import(/* webpackChunkName: "list" */ './views/List.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import(/* webpackChunkName: "user" */ './views/User.vue')
        }
      ]
    },
    {
      path: '/add',
      name: 'add',
      component: () => import(/* webpackChunkName: "add" */ './views/Add.vue')
    }
  ]
})
