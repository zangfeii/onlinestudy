import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
  import ('../views/login/login.vue')
const registerUser = () =>
  import ('../views/login/loginComponent/registerUser.vue')
const Home = () =>
  import ('../views/home/home.vue')
const userInfo = () =>
  import ('../views/home/homeCompoenet/userInfo/userInfo.vue')
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
const teacher = () =>
  import ('../views/courseInfo/teacher/teacher.vue')
const student = () =>
  import ('../views/courseInfo/student/student.vue')
const courseHome = () =>
  import ('../views/courseInfo/teacher/teacherCompoent/courseHome/courseHome.vue')
const courseChapterContent = () =>
  import ('../views/courseInfo/teacher/teacherCompoent/courseHome/childComp/courseChapterContent/courseChapterContent.vue')
const courseData = () =>
  import ('../views/courseInfo/teacher/teacherCompoent/courseData/courseData.vue')
const courseMange = () =>
  import ('../views/courseInfo/teacher/teacherCompoent/courseMange/courseMange.vue')
const leaveMessage = () =>
  import ('../views/courseInfo/teacher/teacherCompoent/courseMange/courseMangeCompoent/stuListCompoent/stuLeaveMessage/leaveMeaage.vue')
const courseNotice = () =>
  import ('../views/courseInfo/teacher/teacherCompoent/courseNotice/courseNotice.vue')
const stuHome = () =>
  import ('../views/courseInfo/student/stuhome/stuHome.vue')
const stuCourseData = () =>
  import ('../views/courseInfo/student/stuCourseData/stuCourseData.vue')
const stuMessage = () =>
  import ('../views/courseInfo/student/stuMessage/stuMessage.vue')
const stuNotic = () =>
  import ("../views/courseInfo/student/stuNotic/stuNotic.vue")
const stuCourseChapterContent = () =>
  import ('../../src/views/courseInfo/student/stuhome/stuHomeComponent/stuCourseChapterContent/stuCourseChapterContent.vue')
const adminHome = () =>
  import ('../views/admin/adminHome.vue')
const adminUser = () =>
  import ('../views/admin/adminCompoent/adminUser.vue')
const adminCourse = () =>
  import ('../views/admin/adminCompoent/adminCourse.vue')
const adminSendNotice = () =>
  import ('../views/admin/adminCompoent/adminSendNotice')
const searchCourse = () =>
  import ('../views/admin/adminCompoent/search/searchCourse.vue')
const searchUser = () =>
  import ('../views/admin/adminCompoent/search/searchUser.vue')
  // 解决报Uncaught (in promise) undefined错误
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
    path: '/adminhome',
    component: adminHome,
    redirect: '/adminhome/mangeuser',
    children: [{
      component: adminUser,
      path: 'mangeuser'
    }, {
      component: adminCourse,
      path: 'mangecourse'
    }, {
      path: 'sendnotice',
      component: adminSendNotice
    }, {
      path: 'searchCourse&?search=:course',
      component: searchCourse,
      name: 'searchCourse'
    }, {
      path: 'searchUser?User=:name',
      name: 'searchUser',
      component: searchUser
    }]
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
      path: 'mange',
      component: userInfo,
      name: 'mange'
    }, {
      path: 'main',
      component: course
    }, {
      path: 'inbox',
      component: InBox,
    }, {
      path: 'message',
      component: message
    }, {
      path: 'notebook',
      component: notebook
    }],
  }, {
    path: '/myCourse/teacherCourse/tec=:iname&course=:cciid',
    redirect: '/myCourse/teacherCourse/tec=:iname&course=:cciid/homePage',
    component: teacher,
    name: 'teacher',
    // meta: {
    //   title: '老师管理界面'
    // },
    children: [{
        path: 'homePage',
        name: 'homePage',
        component: courseHome,
        meta: {
          title: '老师管理界面'
        },
      },
      {
        path: 'chapterdetails',
        component: courseChapterContent,
        name: 'courseChapterContent',
        meta: {
          title: '课程信息'
        }
      },
      {
        path: 'courseData',
        name: 'courseData',
        component: courseData,
        meta: {
          title: '资料'
        }
      },
      {
        path: 'courseMange',
        name: 'courseMange',
        component: courseMange,
        meta: {
          title: '管理'
        },
      },
      {
        path: 'chatwit&stuiid=:siid&incourse=:ciid',
        component: leaveMessage,
        name: 'leaveMessage',
        meta: {
          title: '留言'
        }
      },
      {
        path: 'courseNotice',
        name: 'courseNotice',
        component: courseNotice,
        meta: {
          title: '通知'
        }
      },
      // {
      //   path: 'courseMange',
      //   name: 'courseMange',
      //   component: courseMange,
      //   meta: {
      //     title: '管理'
      //   }
      // }
    ]
  }, {
    path: '/myCourse/studentCorse/stu=:iname&course=:sciid',
    redirect: '/myCourse/studentCorse/stu=:iname&course=:sciid/home',
    component: student,
    name: 'student',
    meta: {
      title: '学习进度页面'
    },
    children: [{
      path: 'home',
      component: stuHome,
      meta: {
        title: '学生端主页面'
      }
    }, {
      path: 'chapterdetaisl',
      component: stuCourseChapterContent,
      name: 'stuCourseChapterContent',
      meta: {
        title: '课程信息'
      }
    }, {
      path: 'download',
      name: stuCourseData,
      component: stuCourseData,
      meta: {
        title: '资料下载'
      }
    }, {
      path: 'message',
      component: stuMessage,
      meta: {
        title: '我的消息'
      }
    }, {
      path: 'notic',
      component: stuNotic,
      meta: {
        title: '课程通知'
      }
    }]

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