import { request } from './request'

export function createNewNote(data) {
  return request({
    url: '/note/createNewNote',
    method: 'post',
    data
  })
}

export function getUserNotes(data) {
  return request({
    url: '/note/getUerNotes',
    method: 'post',
    data
  })
}

export function updateNote(data) {
  return request({
    url: '/note/updateNote',
    method: 'post',
    data
  })
}

export function deleteNote(data) {
  return request({
    url: '/note/deleteNote',
    method: 'post',
    data
  })
}