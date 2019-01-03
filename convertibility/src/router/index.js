import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

/*const index = r => require.ensure([], () =>r(require('../page/index')), 'index');
const country= r => require.ensure([], () => r(require('../components/country')), 'country');
const balance = r => require.ensure([], ()=> r(require('../page/balance')),'balance')
const success = r => require.ensure([], () => r(require('../page/success')), 'success');*/

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/page/index')
    },
    {
      path: '/country',
      name: 'country',
      component: () => import('@/components/country')
    },
    {
      path: '/balance',
      name: 'balance',
      component: () => import('@/page/balance')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/page/success')
    }
  ]
})
