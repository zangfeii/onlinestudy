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