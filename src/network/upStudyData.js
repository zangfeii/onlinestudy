import { request } from './request'

export function upStudyData(data) {
  return request({
    url: '/upData/upStudyData',
    method: 'post',
    data
  })
}

export function getCourseData(data) {
  return request({
    url: '/upData/getCourseDatas',
    method: 'post',
    data
  })
}

export function addDownNums(data) {
  return request({
    url: '/upData/addDownNums',
    method: 'post',
    data
  })
}