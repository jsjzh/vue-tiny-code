/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-28 17:01:29
 * @LastEditTime: 2019-05-09 18:24:11
 * @Description: 拖拽排版图表用 col-style
 */
export default {
  methods: {
    // TODO 这个函数要修改修改
    previewColStyle({ width, height }, baseWidth = 100, baseHeight = 3, layoutRow = 24, mixinStyle = {}) {
      return {
        width: `${(baseWidth * width) / layoutRow}%`,
        height: `${height / baseHeight}px`,
        ...mixinStyle
      }
    }
  }
}
