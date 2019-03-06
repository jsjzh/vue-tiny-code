import Mock from 'mockjs'
import { getUrlParam } from '@/utils'

Mock.mock(/demo/, 'get', function(config) {
  return getUrlParam(config.url)
})

export default Mock
