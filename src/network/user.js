import { request } from './request'

export function registerUsers(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function addCurseStuByTec(data) {
  return request({
    url: '/user/tecAddCourseStu',
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

export function createChapter(data) {
  return request({
    url: '/chapters/addChapter',
    method: 'post',
    data
  })
}
export function deleteChapter(data) {
  return request({
    url: '/chapters/deleteBeforeCourseChapters',
    method: 'post',
    data
  })
}

export function createCourseTopic(data) {
  return request({
    url: '/Topic/createTopic',
    method: 'post',
    data
  })
}

export function deleteCourseOneTopic(data) {
  return request({
    url: '/Topic/deleteCurrentCourseTopic',
    method: 'post',
    data
  })
}

export function getAllUserSomeInfo(data) {
  return request({
    url: '/user/getAllUserSomeInfo',
    method: 'post',
    data
  })
}

export function setUserStatus(data) {
  return request({
    url: '/user/setUserStatus',
    method: 'post',
    data
  })
}

export function setUserRole(data) {
  return request({
    url: '/user/setUserRole',
    method: 'post',
    data
  })
}

export function searchUser(data) {
  return request({
    url: '/user/queryUuserByp',
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

export class stuCreateOneTopic {
  constructor(userInfo, coueseInfo) {
    this.courseiid = coueseInfo._id,
      this.teacheriid = coueseInfo.cteacheriid
    this.CreateName = userInfo.name
    this.pic = userInfo.hpic
  }
}