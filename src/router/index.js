import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
  import ('../views/login/login.vue')
const registerUser = () =>
  import ('../views/login/loginComponent/registerUser.vue')
const Home = () =>
  import ('../views/home/home.vue')


// // 解决报Uncaught (in promise) undefined错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


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
  }, {
    path: '/home&iid=:iid&name=:iname',
    component: Home,
    name: 'home'
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  const getToken = window.sessionStorage.getItem('token') || 1
  if (to.path === '/login') {
    next()
  } else if (to.path === '/register') {
    next()
  } else if (getToken === 1) {
    next('/login')
  } else {
    next()
  }

})

export default router