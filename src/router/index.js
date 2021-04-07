import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/order',
    name: 'Order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue')
  },{
    path:'/login',
    name:"Login",
    component:()=>import('../views/login.vue')
  },{
    path:'/register',
    name:"Register",
    component:()=>import('../views/register.vue')
  },{
    path:'/info',
    name:"Info",
    component:()=>import('../views/Info.vue')
  },{
    path:'/orderInfo/:id',
    name:"OrderInfo",
    component:()=>import('../views/OrdeInfo.vue')
  },{
    path:'/order/create',
    name:"createOrder",
    component:()=>import('../views/createOrder.vue')
  },{
    path:'/address',
    name:"address",
    component:()=>import('../views/common/address.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
