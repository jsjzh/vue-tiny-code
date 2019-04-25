import { post, get } from './service'

export function getreportcomponentinfo(reportKey) {
  return get('/getreportcomponentinfo', { reportKey })
}

export function getcomponentinfo() {
  return get('/getcomponentinfo', {})
}
