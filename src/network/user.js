import { request } from './request'

export function registerUsers(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function userLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function createCoursing(data) {
  return request({
    url: '/course/createCourse',
    method: 'post',
    data
  })
}

export function getCotranct() {
  return request({
    url: '/contact',
    method: 'get'
  })
}

export function stuEnterCourse(data) {
  return request({
    url: '/courseStu/enterCourse',
    method: 'post',
    data
  })
}
export class oneCourseStuInfo {
  constructor(teacher, stu) {
    this.cs_title = teacher.ctitle
    this.cs_courseiid = teacher._id
    this.cs_teacheriid = teacher.cteacheriid
    this.cs_teachername = teacher.cteacher
    this.cs_desc = teacher.cdesc
    this.cs_stuiid = stu.user_id
    this.cs_stuname = stu.name
  }
}