/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-11 10:55:03
 * @LastEditTime: 2019-02-28 18:04:28
 * @Description: 组件相关信息
 */

/**
 * align
 * center: center
 * left: flex-start
 * right: flex-end
 * around: space-around
 * between: space-between
 */

export const layoutData = {
  children: [
    {
      align: 'flex-start',
      height: 100,
      index: 0,
      showControllerBar: false,
      children: [
        { showChildrenControllerBar: false, layoutCol: 4.8, initLayoutCol: 4.8 },
        { showChildrenControllerBar: false, layoutCol: 4.8, initLayoutCol: 4.8 },
        { showChildrenControllerBar: false, layoutCol: 4.8, initLayoutCol: 4.8 },
        { showChildrenControllerBar: false, layoutCol: 4.8, initLayoutCol: 4.8 },
        { showChildrenControllerBar: false, layoutCol: 4.8, initLayoutCol: 4.8 }
      ]
    },
    {
      align: 'flex-start',
      height: 250,
      index: 1,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    },
    {
      align: 'flex-start',
      height: 250,
      index: 2,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    },
    {
      align: 'flex-start',
      height: 250,
      index: 3,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    }
  ]
}

export const alignType = [
  { title: '居中对齐', label: 'center', value: 'center' },
  { title: '左对齐', label: 'left', value: 'flex-start' },
  { title: '右对齐', label: 'right', value: 'flex-end' },
  { title: '两侧留白', label: 'around', value: 'space-around' },
  { title: '两侧对齐', label: 'between', value: 'space-between' }
]
