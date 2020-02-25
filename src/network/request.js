import axios from 'axios'

export function request(confing) {
  const instace1 = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000,
  })

  // 请求拦截
  instace1.interceptors.request.use(confing => {
      return confing
    })
    // 响应拦截
  instace1.interceptors.response.use(confing => {
    return confing
  })

  return instace1(confing)
}