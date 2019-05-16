/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-28 17:01:29
 * @LastEditTime: 2019-05-16 17:10:33
 * @Description: 拖拽排版图表用 col-style
 */
export default {
  methods: {
    previewColStyle({ width, height, baseWidth = 100, baseHeight = 3, layoutRow = 24 }, mixinStyle = {}) {
      return {
        width: `${(baseWidth * width) / layoutRow}%`,
        height: `${height / baseHeight}px`,
        ...mixinStyle
      }
    }
  }
}
