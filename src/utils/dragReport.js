import { mixinObjs, isSame } from './index'
import Vue from 'vue'

export const alignType = [
  { title: '左对齐', label: 'left', value: 'flex-start' },
  { title: '居中对齐', label: 'center', value: 'center' },
  { title: '右对齐', label: 'right', value: 'flex-end' },
  { title: '两侧留白', label: 'around', value: 'space-around' },
  { title: '两侧对齐', label: 'between', value: 'space-between' }
]

export function getInitCol(mixinOptions) {
  return mixinObjs(
    {
      title: null,
      col: 0,
      componentKey: null,
      initCol: 0,
      showChildrenControllerBar: false
    },
    mixinOptions
  )
}

export function getInitRow(row) {
  return {
    index: null,
    align: 'flex-start',
    initHeight: row[0].height,
    showControllerBar: false,
    children: row.map(col => getInitCol({ initCol: col.value }))
  }
}

export function resetIndex(row, index) {
  row.index = index + 1
}

export function PreviewDataToLayoutData(layoutData, componentDatas, rowMixin = {}, colMixin = {}) {
  const { children: rows } = layoutData
  rows.forEach(row => {
    row = mixinObjs(row, rowMixin)
    let { children: cols } = row
    cols.forEach((col, colIndex) => {
      let currComponent = componentDatas.find(isSame('componentKey', col)) || {}
      Vue.set(cols, colIndex, mixinObjs(col, currComponent, colMixin))
    })
  })
  return layoutData
}

export function layoutDataToPreviewData(layoutData) {
  return {
    title: layoutData.title,
    reportUnionKey: layoutData.reportUnionKey,
    children: layoutData.children.map(row => {
      return {
        title: row.title,
        align: row.align,
        initHeight: row.initHeight,
        index: row.index,
        children: row.children.map(col => ({
          col: col.col,
          componentKey: col.componentKey,
          initCol: col.initCol,
          title: col.title
        }))
      }
    })
  }
}

/**
 *
 * @param {Object} transObj
 * @param {Array} transArray
 */
export function transObjFromArray(transObj, transArray) {
  return transArray.reduce((pre, curr) => {
    if (curr.prop in transObj) {
      return [
        ...pre,
        {
          name: curr.name,
          value: transObj[curr.prop]
        }
      ]
    } else {
      return pre
    }
  }, [])
}
