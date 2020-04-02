import { request } from './request'

export function getNotices(data) {
  return request({
    url: '/notice/queryCurrentUserNotices',
    method: 'post',
    data
  })
}

export function setNoticeRead(data) {
  return request({
    url: '/notice/setCurrentNoticeIsread',
    method: 'post',
    data
  })
}

export function setCourseNoticeSend(data) {
  return request({
    url: '/notice/setCourseNoticeSend',
    method: 'post',
    data
  })
}

export function getCurrentCourseNotices(data) {
  return request({
    url: '/notice/getCurrentCourseNotices',
    method: 'post',
    data
  })
}

export function deleteTecSendCourseNotice(data) {
  return request({
    url: '/notice/deleteTecSToStuNotice',
    method: 'post',
    data
  })
}

export function deleteStuGetOneNotice(data) {
  return request({
    url: '/notice/deleteStuGetOneNotice',
    method: 'post',
    data
  })
}

export function getCourseStuGetNotices(data) {
  return request({
    url: '/notice/getCurrentCourseGetNotcies',
    method: 'post',
    data
  })
}