/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-01-30 09:34:29
 * @LastEditTime: 2019-03-06 15:35:39
 * @Description: 复制函数
 */
export default function(text) {
  const body = document.querySelector('body')
  const input = document.createElement('input')
  input.value = text
  input.style.opacity = 0
  input.style.position = 'fixed'
  input.style.top = '0'
  input.style.left = '0'
  body.appendChild(input)
  input.select()
  document.execCommand('copy')
  body.removeChild(input)
}
