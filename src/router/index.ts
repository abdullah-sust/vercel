import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import AnswerList from '../components/AnswerList.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/question-list',
    name: 'Home',
    component: Home
  },
  {
    path: '/answer-list/:id/',
    name: 'AnswerList',
    component: AnswerList
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('isUserLoggedIn') === '1') {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/*/',
    component: Home,
    alias: '/question-list'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
