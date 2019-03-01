/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-11 10:55:03
 * @LastEditTime: 2019-03-01 14:52:23
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

export const alignType = [
  { title: '左对齐', label: 'left', value: 'flex-start' },
  { title: '居中对齐', label: 'center', value: 'center' },
  { title: '右对齐', label: 'right', value: 'flex-end' },
  { title: '两侧留白', label: 'around', value: 'space-around' },
  { title: '两侧对齐', label: 'between', value: 'space-between' }
]

export const layoutData = {
  children: [
    {
      align: alignType[0].value,
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
      align: alignType[0].value,
      height: 250,
      index: 1,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    },
    {
      align: alignType[0].value,
      height: 250,
      index: 2,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    },
    {
      align: alignType[0].value,
      height: 250,
      index: 3,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    }
  ]
}

export const dragReportData = {
  title: 'drag-report',
  children: [
    {
      align: alignType[0].value,
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
      align: alignType[0].value,
      height: 250,
      index: 1,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    },
    {
      align: alignType[0].value,
      height: 250,
      index: 2,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    },
    {
      align: alignType[0].value,
      height: 250,
      index: 3,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    }
  ]
}
