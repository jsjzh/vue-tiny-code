import { post, get } from './service'

export function demo(name) {
  return get('/demo', { name, namePro: name })
}
