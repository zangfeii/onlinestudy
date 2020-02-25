import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
  import ('../views/login.vue')
const registerUser = () =>
  import ('../views/login/registerUser.vue')


Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login,
  }, {
    path: '/register',
    component: registerUser,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router