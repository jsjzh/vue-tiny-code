import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/palette',
      name: 'palette',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ './views/Palette.vue')
    },
    {
      path: '/palettePro',
      name: 'palettePro',
      component: () =>
        import( /* webpackChunkName: "about" */ './views/PalettePro.vue')
    },
    {
      path: '/Resize',
      name: 'Resize',
      component: () =>
        import( /* webpackChunkName: "about" */ './views/Resize.vue')
    },
  ]
})