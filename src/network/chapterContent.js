import { request } from './request'

export function writeChapter(data) {
  return request({
    url: '/chapterContent/createChapterContent',
    method: 'post',
    data
  })
}

export function getCurrentChapterContent(data) {
  return request({
    url: '/chapterContent/getCurentChapterContent',
    method: 'post',
    data
  })
}

export function updateChapterContent(data) {
  return request({
    url: '/chapterContent/updateChapterContent',
    method: 'post',
    data
  })
}