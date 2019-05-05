/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-06 15:10:59
 * @LastEditTime: 2019-05-05 14:38:03
 * @Description: from https://github.com/linwalker/render-html-to-pdf
 */
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function exportPDF(dom, title = '未命名 PDF', options = {}) {
  html2canvas(document.querySelector(dom), options).then(canvas => {
    // A4 尺寸 [595.28, 841.89]
    let contentWidth = canvas.width
    let contentHeight = canvas.height
    // 一页 pdf 显示 html 页面生成的 canvas 高度
    let pageHeight = (contentWidth / 592.28) * 841.89
    // 未生成 pdf 的 html 页面高度
    let leftHeight = contentHeight
    // 页面偏移
    let position = 0
    // html 页面生成的 canvas 在 pdf 中图片的宽高
    let imgWidth = 595.28
    let imgHeight = (592.28 / contentWidth) * contentHeight

    let pageData = canvas.toDataURL('image/jpeg', 1)

    let pdf = new jsPDF('', 'pt', 'a4')

    // 有两个高度需要区分，一个是 html 页面的实际高度，和生成 pdf 的页面高度
    // 当内容未超过 pdf 一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        //避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage()
        }
      }
    }

    pdf.save(`${title} ${new Date().getTime()}.pdf`)
  })
}

export default exportPDF
