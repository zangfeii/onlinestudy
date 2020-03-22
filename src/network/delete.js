import { request } from './request'

export function singOutCourseById(data) {
  return request({
    url: '/courseStu/singOutCourseById',
    method: 'post',
    data
  })
}

export function deleteCouse(data) {
  return request({
    url: '/course/deleteCourse',
    method: 'post',
    data
  })
}