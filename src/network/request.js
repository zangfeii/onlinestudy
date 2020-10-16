import axios from 'axios'
import { beforeQueryCourseIsExist } from './query'



export function request(confing) {
  const instace1 = axios.create({
       baseURL: 'http://127.0.0.1:3000/api',
     // baseURL: 　 'http://192.168.1.8:8082/api',
      timeout: 5000,
    })
    // 请求拦截
  instace1.interceptors.request.use(confing => {
      confing.headers.Authorization = window.sessionStorage.getItem('token')
      if (window.location.pathname.substr(0, 9) === '/myCourse') {
        beforeQueryCourseIsExist({
          useriid: JSON.parse(window.sessionStorage.getItem('currentCourseInfo')).cteacheriid,
          courseid: JSON.parse(window.sessionStorage.getItem('currentCourseInfo'))._id
        }).then(res => {
          console.log(res.data.data)
          if (res.data.data) {
            return confing
          } else {
            window.location.href = '/undefind'
            return
          }
        })
      } else {
        return confing
      }
      return confing
    })
    // 响应拦截
  instace1.interceptors.response.use(confing => {
    return confing
  })
  return instace1(confing)
}

export function request1(confing) {
  const instace2 = axios.create({
     baseURL: 'http://127.0.0.1:3000/api',
    //baseURL: 　 'http://192.168.1.8:8082/api',
    timeout: 5000
  })
  instace2.interceptors.request.use(confing => {
    confing.headers.Authorization = window.sessionStorage.getItem('token')
    return confing
  })
  return instace2(confing)
}