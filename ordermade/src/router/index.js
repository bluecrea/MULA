import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const index = r => require.ensure([], () => r(require('../page/index')), 'index')
const city = r => require.ensure([], () => r(require('../page/city')),'city')
const search = r => require.ensure([], () => r(require('../page/search')),'search')
const madelist = r => require.ensure([], () => r(require('../page/madelist')),'madelist')
const datepicker = r => require.ensure([], () => r(require('../components/datePicker')), 'datepicker')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/city',
      name: 'city',
      component: city
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/madelist',
      name: 'madelist',
      component: madelist
    },
    {
      path: '/datepicker',
      name: 'datepicker',
      component: datepicker
    }
  ]
})
