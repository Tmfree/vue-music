import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      meta: { keepAlive: true, isShowNavBar: true, isShowFooter: true },
      component: Home
    },
    {
      path: "/mv",
      name: "mv",
      meta: { keepAlive: true, isShowNavBar: false, isShowFooter: true },
      component: () => import('./views/MV.vue')
    },
    {
      path: "/singstyle",
      name: "singstyle",
      meta: { keepAlive: false, isShowNavBar: true, isShowFooter: true },
      component: () => import('./views/SingStyle.vue')
    },
    {
      path: "/playlist",
      name: "playlist",
      meta: { isShowNavBar: false, isShowFooter: false },
      component: () => import('./views/Music.vue')
    },
    {
      path: "/person",
      name: "person",
      meta: { keepAlive: true, isShowNavBar: false, isShowFooter: true },
      component: () => import('./views/PersonCenter.vue')
    },
    {
      path: "/login",
      name: "login",
      meta: { isShowNavBar: false, isShowFooter: false },
      component: () => import('./views/Login.vue')
    },
    {
      path: "/search",
      name: "search",
      meta: { isShowNavBar: false, isShowFooter: false },
      component: () => import('./views/Search.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
