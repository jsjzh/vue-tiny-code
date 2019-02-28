import Vue from 'vue'
import Router from 'vue-router'

const importLayout = name => require(`@/layout/${name}/index.vue`).default
const importView = name => require(`@/views/${name}/index.vue`).default

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'home',
    component: importLayout('home'),
    children: [
      {
        path: 'dragReport',
        name: 'dragReport',
        component: importView('dragReport')
      },
      {
        path: 'previewReport',
        name: 'previewReport',
        component: importView('previewReport')
      },
      {
        path: 'palettePro',
        name: 'palettePro',
        component: importView('palettePro')
      },
      {
        path: 'resize',
        name: 'resize',
        component: importView('resize')
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
