import { request } from './request'

export function singOutCourseById(data) {
  return request({
    url: '/courseStu/singOutCourseById',
    method: 'post',
    data
  })
}