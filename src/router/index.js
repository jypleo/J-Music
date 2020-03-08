import Vue from 'vue'
import VueRouter from 'vue-router'
import navView from 'views/nav/index'
import findView from 'views/Find/index'
import albumPageView from 'views/albumPage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: navView,
    redirect: '/find',
    children: [{
      path: '/find',
      component: findView
    }]
  },
  {
    path: '/albumPage',
    name: 'albumPage',
    component: albumPageView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
