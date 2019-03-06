import { post, get } from './service'

export function getReportData(reportKey) {
  return get('/getReportData', { reportKey })
}

export function getComponents() {
  return get('/getComponents', {})
}
