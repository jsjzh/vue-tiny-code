import Vue from 'vue'
import Router from 'vue-router'

const importLayout = name => require(`@/layout/${name}/index.vue`).default
const importView = name => require(`@/views/${name}/index.vue`).default

const importLayoutJsx = name => require(`@/layout/${name}/index.js`).default
const importViewJsx = name => require(`@/views/${name}/index.js`).default

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'home',
    component: importLayout('home'),
    children: [
      {
        path: 'palette',
        name: 'palette',
        component: importView('palette')
      },
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
        path: 'editComponent',
        name: 'editComponent',
        component: importView('editComponent')
      },
      {
        path: 'customReportList',
        name: 'customReportList',
        component: importView('customReportList')
      },
      {
        path: 'previewComponent',
        name: 'previewComponent',
        component: importView('previewComponent')
      },
      {
        path: 'waves',
        name: 'waves',
        component: importView('waves')
      },
      {
        path: 'dragDialog',
        name: 'dragDialog',
        component: importView('dragDialog')
      },
      {
        path: 'customLoading',
        name: 'customLoading',
        component: importView('customLoading')
      },
      {
        path: 'customScrollbar',
        name: 'customScrollbar',
        component: importView('customScrollbar')
      },
      {
        path: 'dragList',
        name: 'dragList',
        component: importView('dragList')
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
