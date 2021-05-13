import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
import Shoes from '../views/Shoes.vue'
import ShoesEdit from '../views/ShoesEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'user',
    component: Users
  },
  {
    path: '/users',
    name: 'user',
    component: Users
  },
  {
    path: '/shoes',
    name: 'shoes',
    component: Shoes
  },
  {
    path: '/shoes/:id',
    name: 'shoesEdit',
    component: ShoesEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
