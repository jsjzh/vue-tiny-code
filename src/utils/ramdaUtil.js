import { reDup } from './index'
import * as R from 'ramda'

export const diff = R.curry(function(target, a, b) {
  if (!target) return a - b
  return a[target] - b[target]
})

export const diffCount = diff(null)

/**
 * 对数组去重并排序，必须是一维的数字数组
 */
export const sortAndDup = R.compose(
  reDup,
  R.sort(diffCount)
)

/**
 * 遍历并提取一个 prop
 */
export const mapProp = function(prop) {
  return R.map(R.prop(prop))
}

/**
 * 遍历并提取一个 prop，去重然后排序
 */
export const mapPropAndSortAndDup = R.curry(function(prop, array) {
  return R.compose(
    sortAndDup,
    mapProp(prop)
  )(array)
})

/**
 * 过滤一个数组中元素的某 prop 和 traget 相同的部分
 */
export const filterPropEquals = R.curry(function(prop, target) {
  return R.filter(
    R.compose(
      R.equals(target),
      R.prop(prop)
    )
  )
})

export const isIndexOf = R.curry(function(target, from) {
  return R.indexOf(target, from) !== -1
})
