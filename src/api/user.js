import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'https://www.easy-mock.com/mock/5f408c355624d5650b1bca9d/example/my-vue-login',
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
