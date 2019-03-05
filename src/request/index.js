import axios from 'axios'

export function get(url) {
  return function(params) {
    return axios.get(url, { params })
  }
}
export function post(url) {
  return function(data) {
    return axios.post(url, data)
  }
}
