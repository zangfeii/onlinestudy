import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
  import ('../views/login/login.vue')
const registerUser = () =>
  import ('../views/login/loginComponent/registerUser.vue')
const Home = () =>
  import ('../views/home/home.vue')
const course = () =>
  import ('../components/content/course/course.vue')
const InBox = () =>
  import ('../components/content/inbox/InBox.vue')
const message = () =>
  import ('../components/content/myMessage/message.vue')
const notebook = () =>
  import ('../components/content/notebook/note.vue')
const createCourse = () =>
  import ('../views/createCourse/createCourse.vue')


// 解决报Uncaught (in promise) undefined错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: 'login'
}, {
  path: '/login',
  component: Login,
}, {
  path: '/createCourse',
  name: 'createClass',
  component: createCourse
}, {
  path: '/register',
  component: registerUser,
}, {
  path: '/home&iid=:iid&name=:iname',
  component: Home,
  name: 'home',
  redirect: '/home&iid=:iid&name=:iname/course',
  children: [{
    path: 'course',
    component: course
  }, {
    path: 'main',
    component: course
  }, {
    path: 'inbox',
    component: InBox
  }, {
    path: 'message',
    component: message
  }, {
    path: 'notebook',
    component: notebook
  }],
}, ]

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