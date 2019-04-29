import { Message } from 'element-ui'
import axios from 'axios'
import * as R from 'ramda'

const service = axios.create({
  baseURL: 'http://localhost',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    config.params = { ...config.params, _t: +Date.now() }
    return config
  },
  err => {
    console.log('request err', err)
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      Message({
        message: response.status,
        type: 'error',
        duration: 5 * 1000
      })
      console.log('response err', response)
      return Promise.reject('err')
    } else {
      return response.data
    }
  },
  err => {
    Message({
      message: err.messages,
      type: 'error',
      duration: 5 * 1000
    })
    console.log('response err', err)
    return Promise.reject(err)
  }
)

export const get = R.curry(function(url, params) {
  return service.get(url, { params })
})

export const post = R.curry(function(url, params) {
  return service.post(url, { params })
})

export default service
