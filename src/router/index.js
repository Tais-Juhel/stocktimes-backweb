import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
import Shoes from '../views/Shoes.vue'
import ShoesEdit from '../views/ShoesEdit.vue'
import Brands from '../views/Brands.vue'
import BrandEdit from '../views/BrandEdit.vue'
import CreateBrand from '../views/CreateBrand.vue'
import CreateShoes from '../views/CreateShoes.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'shoes',
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
  },
  {
    path: '/create/shoes',
    name: 'createShoes',
    component: CreateShoes
  },
  {
    path: '/brands',
    name: 'brands',
    component: Brands
  },
  {
    path: '/brands/:id',
    name: 'brandsEdit',
    component: BrandEdit
  },
  {
    path: '/create/brand',
    name: 'createBrand',
    component: CreateBrand
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
