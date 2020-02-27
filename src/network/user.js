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

export function getCotranct() {
  return request({
    url: '/contact',
    method: 'get'
  })
}