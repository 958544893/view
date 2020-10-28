import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import First from '@/components/views/First'
import Login from '@/views/Login'
import ComplexTable from '@/views/table/complex-table'
import Dynamictable from '@/views/table/dynamictable'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/',
    redirect: 'complextable',
    meta: { title: '', icon: 'example' },
    children: [{
      name: 'ComplexTable',
      path: 'complextable',
      component: () => import('@/views/table/complex-table'),
      meta: { title: '首页', icon: 'table' }
    }]
  },
]
export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/first',
      name: 'First',
      component: First
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/complextable',
      name: 'ComplexTable',
      component: ComplexTable
    },
    {
      path: '/dynamictable',
      name: 'Dynamictable',
      component: Dynamictable
    },
  ]
})

