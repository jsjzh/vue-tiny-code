/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2018-6-28 15:13:23
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-16 16:40:34
 * @Description: 常用函数包装
 */
import * as R from 'ramda'
import { Message } from 'element-ui'

const OBJECT = '[object Object]'
const ARRAY = '[object Array]'
const NUMBER = '[object Number]'
const FUNCTION = '[object Function]'
const STRING = '[object String]'
const NULL = '[object Null]'
const UNDEFINED = '[object Undefined]'

// 判断两者数据类型是否相等
// 若不相等 返回 true
export function EXtypeof(item, type) {
  return Object.prototype.toString.call(item) === Object.prototype.toString.call(type)
}

/**
 * 合并 promise 请求
 * @param {Array} promises promise 请求
 */
export function mergePromises(promises) {
  if (!EXtypeof(promises, new Array())) return
  return new Promise((resolve, reject) => {
    Promise.all(promises).then(resArr => {
      resolve(resArr)
    })
  })
}

/**
 * 传入数组或者对象 深度遍历 将所有 value 为 null undefined "" 转为 -
 * @param {Object | Array} obj
 */
export function filterObject(obj) {
  if (typeof obj !== 'array' && typeof obj !== 'object') return
  if (Object.prototype.toString.call(obj) === ARRAY) {
    obj.forEach(elem => {
      filterObject(elem)
    })
  } else if (Object.prototype.toString.call(obj) === OBJECT) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        let item = obj[key]
        if (Object.prototype.toString.call(item) === OBJECT) {
          filterObject(item)
        } else if (Object.prototype.toString.call(item) === ARRAY) {
          filterObject(item)
        } else {
          obj[key] = item !== null && item !== undefined && item !== '' ? item : '-'
        }
      }
    }
  }
}

/**
 * 递归删除树状图的 data 的 type
 * @param {Object} todoData
 * @param {String} type
 */
export function recursionData(todoData, type) {
  return todoData.filter(item => {
    item.children.length ? (item.children = recursionData(item.children, type)) : ''
    return item.type !== type
  })
}

export function bindResize() {
  if (this.instance) {
    this.instance.resize()
  }
  if (this.chartObj) {
    this.chartObj.resize()
  }
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 将数组组中相同 key 的数组的 item 合并
 * @param {String} key key
 * @param  {...any} args
 */
export function mergeArrByKey(key, ...args) {
  return args.splice(0, 1)[0].map(item => {
    args.forEach(arg => {
      let obj = arg.find(ite => ite[key] === item[key])
      obj && (item = { ...item, ...obj })
    })
    return item
  })
}
/**
 * 按照 byArr 的顺序排序数组
 * @param {Array} byArr name 组成的数组
 * @param {Array} arr 待排序的数组
 */
export function sortByName(byArr, arr, key = 'name') {
  let rtn = []
  byArr.forEach(it => {
    for (let idx = 0; idx < arr.length; idx++) {
      if (it === arr[idx][key]) {
        rtn.push(arr[idx])
        arr.splice(idx, 1)
        break
      }
    }
  })
  return rtn.concat(arr)
}

export const diff = R.curry(function(target, a, b) {
  if (!target) return a - b
  return a[target] - b[target]
})

export const diffIndex = diff('index')

export function filterZtreeDataByType(data, type) {
  if (!Array.isArray(data)) {
    data = data.children || []
  }
  data.forEach(item => {
    if (item.type === type - 1) {
      item.children = []
    } else {
      filterZtreeDataByType(item.children, type)
    }
  })
}

/**
 * 拍平树状图数据
 * @param {Array Object} data 树状图 data
 * @param {String} key 树状图表示子代的 key
 */
export function flatZtreeData(data, key = 'children') {
  if (!Array.isArray(data)) {
    data = [data]
  }
  return data.reduce((pre, curr) => {
    if (Array.isArray(curr[key])) {
      return [...pre, curr, ...flatZtreeData(curr[key])]
    } else {
      return [pre]
    }
  }, [])
}

export function flatLayout(data, key = 'children') {
  if (!Array.isArray(data)) {
    data = [data]
  }

  return data.reduce((pre, curr) => {
    if (!curr[key]) {
      return [...pre, curr]
    } else {
      return [...pre, ...flatLayout(curr[key])]
    }
  }, [])
}

export function mapZtreeDataByType(data, type) {
  if (!Array.isArray(data)) {
    data = [data]
  }
  return flatZtreeData(data).filter(item => item.type === type)
}

export function filterByKey(key = 'col', data) {
  let arr = []
  data.forEach(item => {
    if (arr.findIndex(it => it[key] === item[key]) === -1) {
      arr.push(item)
    }
  })
  return arr
}

export function transLineChartData({ valueKey, nameKey, toValueKey = 'value', toNameKey = 'name' }, data) {
  return data.reduce(
    (pre, curr) => {
      pre[[toValueKey]].push(curr[[valueKey]])
      pre[[toNameKey]].push(curr[[nameKey]])
      return pre
    },
    { [toValueKey]: [], [toNameKey]: [] }
  )
}

export function transPieChartData({ valueKey, nameKey, toValueKey = 'value', toNameKey = 'name' }, data) {
  return data.map(item => ({ [toValueKey]: item[valueKey], [toNameKey]: item[nameKey] }))
}

export function transBarChartData({ valueKey, nameKey, toValueKey = 'value', toNameKey = 'name' }, data) {
  return data.reduce(
    (pre, curr) => {
      pre[[toValueKey]].push(curr[[valueKey]])
      pre[[toNameKey]].push(curr[[nameKey]])
      return pre
    },
    { [toValueKey]: [], [toNameKey]: [] }
  )
}

export function mixinData(item, mixinData) {
  return { ...item, ...mixinData }
}

export function transUrlParams(url) {
  const paramStr = url.split('?')[1]
  if (!paramStr) return {}
  let paramObj = JSON.parse(`{"${paramStr.replace(/&/g, '","').replace(/=/g, '":"')}"}`)
  Object.keys(paramObj).forEach(key => {
    paramObj[key] = decodeURI(paramObj[key])
  })
  return paramObj
}

export function transBodyParams(body) {
  let obj = JSON.parse(body)
  return obj.params ? obj.params : obj
}

export function hyphen2hump(str) {
  return str.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase())
}

export function dir2file(str) {
  // TODO 判断文件夹现在用的是 \w\/\w，欠妥
  return str.replace(/(\w\/\w)/g, ($0, $1) => $1.replace('/', '-'))
}

export function $msg(message = '0_操作成功', callback, duration = 1500) {
  let arr = ['success', 'error', 'info']
  let dealArr = message.split('_')
  let type = arr[~~dealArr[0]] || 'info'
  message = dealArr[1] || '未知信息'
  Message({
    type,
    showClose: true,
    message,
    duration
  })
  if (typeof callback === 'function') callback(true)
  return Promise.resolve(true)
}

export function openNewTab(url) {
  window.open(url, '_blank')
}

export function openNewWindow(url, title, w, h) {
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop
  const newWindow = window.open(
    url,
    title,
    `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,copyhistory=no,width=${w},height=${h},top=${top},left=${left}`
  )

  if (window.focus) {
    newWindow.focus()
  }
}

export function setStorage(key, value, type = 'local') {
  window[type + 'Storage'].setItem(key, value)
}

export function resolveStorage(key, type = 'local') {
  let value = window[type + 'Storage'].getItem(key)
  if (value === 'false') return false
  if (value === 'true') return true
  if (value.indexOf('{') !== -1 && value.indexOf('}') !== -1) return JSON.parse(value)
  return value
}

export function mixinObjs(...objs) {
  return Object.assign.apply(null, objs)
}

export const isSame = R.curry(function(target, a, b) {
  if (!target) return a === b
  return a[target] === b[target]
})

export function noop() {
  return function() {}
}

export function getRamdomCountByNum(total = 100, num = 4) {
  let arr = []
  let _total = total
  for (let index = 1; index < num; index++) {
    arr[index - 1] = (Math.random() * total).toFixed(0)
    total -= arr[index - 1]
  }
  arr[num - 1] = arr.reduce((pre, curr) => pre - curr, _total)
  return arr
}

export function reDup(array) {
  return Array.from(new Set(array))
}
