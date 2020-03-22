import { request } from './request'

export function upCourseTopicToUp(data) {
  return request({
    url: '/Topic/updateTopicToUp',
    method: 'post',
    data
  })
}

export function upCourseTopicDown(data) {
  return request({
    url: '/Topic/updateTopicToDown',
    method: 'post',
    data
  })
}

export function updateUserPwd(data) {
  return request({
    url: '/user/updateUserPwd',
    method: 'post',
    data
  })
}

export function updateCourseCoverImg(data) {
  return request({
    url: '/course/updateCourseCoverImg',
    method: 'post',
    data
  })
}