import { request } from './request'

export function queryCoursesById(data) {
  return request({
    url: '/queryCourse/queryCourseById',
    method: 'post',
    data
  })
}

export function queryCourseByInCode(data) {
  return request({
    url: '/queryCourse/queryCourseByinCode',
    method: 'post',
    data
  })
}

export function beforeEnterCuorseQuery(data) {
  return request({
    url: '/courseStu/beforeEnterQuery',
    method: 'post',
    data
  })
}


export function getUserEnterCourseIdds(data) {
  return request({
    url: '/courseStu/queryEnterCourseIds',
    method: 'post',
    data
  })
}

export function getUserEnterCoueses(data) {
  return request({
    url: '/queryCourse/queryEnterCourses',
    method: 'post',
    data
  })
}

export function queryCurrentCourseChapters(data) {
  return request({
    url: '/chapters/quereyChapter',
    method: 'post',
    data
  })
}

export function queryCurrentCourseTopic(data) {
  return request({
    url: '/Topic/queryCurrentCourseTopic',
    method: 'post',
    data
  })
}

export function queryCourrentCourseStus(data) {
  return request({
    url: '/courseStu/queryCourrentCourseStusList',
    method: 'post',
    data
  })
}

export function queryUsersListsByIds(data) {
  return request({
    url: '/user/queryUsersByids',
    method: 'post',
    data
  })
}