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