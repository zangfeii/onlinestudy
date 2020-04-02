import { request } from './request'

export function sendFirstMessage(data) {
  return request({
    url: '/message/sendFirstMeassage',
    method: 'post',
    data
  })
}

export function queryCurrentTecStuMessages(data) {
  return request({
    url: '/message/queryCurrenTecStuMessage',
    method: 'post',
    data
  })
}

export function replaySelf(data) {
  return request({
    url: '/message/replaySelf',
    method: 'post',
    data
  })
}

export function stuAtTecReplay(data) {
  return request({
    url: '/message/stuAtTecReplay',
    method: 'post',
    data
  })
}

export function tecAtStuReplay(data) {
  return request({
    url: '/message/tecReplayAt',
    method: 'post',
    data
  })
}

export function stuLeaveTecMsgs(data) {
  return request({
    url: '/message/getStuLeaveTecMsgs',
    method: 'post',
    data
  })
}

export function getUserSendMsgs(data) {
  return request({
    url: '/message/getUserSnedMsgs',
    method: 'post',
    data
  })
}

export function getUserGetMsgs(data) {
  return request({
    url: '/message/getUserGetMsgs',
    method: 'post',
    data
  })
}