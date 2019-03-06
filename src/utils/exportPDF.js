import html2canvas from 'html2canvas'
import * as jsPDF from 'jspdf'

function exportPDF(dom) {
  let container = document.querySelector(dom)

  let width = container.width()
  let height = container.height()
  let canvas = document.createElement('canvas')
  let canvas2D = canvas.getContext('2d')

  let scale = 1
  canvas.width = width * scale
  canvas.height = height * scale
  canvas2D.scale(scale, scale)

  let options = {
    async: false,
    tainttest: true,
    canvas: canvas,
    scale: scale,
    width: width,
    logging: false,
    height: height
  }

  html2canvas(container[0], options).then(canvas => {
    let imgData = canvas.toDataURL('image/jpeg')
    let p = 1
    let doc
    if (width > height) {
      doc = new jsPDF('l', 'mm', [width * scale * p, height * scale * p])
    } else {
      doc = new jsPDF('p', 'mm', [width * scale * p, height * scale * p])
    }
    doc.addImage(imgData, 'jpeg', 0, 0, width * scale * p, height * scale * p)
    doc.save(`自定义报表` + new Date().getTime() + '.pdf')
  })
}

export default exportPDF
