import { hsv2rgb, hsv2hsl, rgb2hsv, hsl2hsv, toHex, parseHex } from './convert'

// 内部使用颜色之前 默认需要转换成 HSVA 模式
export default class Color {
  constructor(options) {
    this.pure = options.pure || ''
    this.value = options.value || ''
    this.format = options.format || 'hsva'
    this._chunkAngle = 360 / (options.precision || 12 * 5)

    this.recomColors = [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 1)',
      'rgba(156, 39, 176, 1)',
      'rgba(103, 58, 183, 1)',
      'rgba(63, 81, 181, 1)',
      'rgba(33, 150, 243, 1)',
      'rgba(3, 169, 244, 1)',
      'rgba(0, 188, 212, 1)',
      'rgba(0, 150, 136, 1)',
      'rgba(76, 175, 80, 1)',
      'rgba(139, 195, 74, 1)',
      'rgba(205, 220, 57, 1)',
      'rgba(255, 235, 59, 1)',
      'rgba(255, 193, 7, 1)',
      'rgba(255, 152, 0, 1)',
      'rgba(255, 87, 34, 1)',
      'rgba(121, 85, 72, 1)',
      'rgba(158, 158, 158, 1)',
      'rgba(96, 125, 13, 19)'
    ]

    this._hue = 0
    this._saturation = 100
    this._value = 100
    this._trans = 1

    this.output = ''

    this._handleChange()
  }

  get(prop) {
    return this[prop]
  }

  // 传入皆为 0-100 之间的整数
  _update(sat, value, hue, trans) {
    this._hue = Math.round(360 - (hue / 100) * 360)
    this._saturation = Math.round((sat / 100) * 100)
    this._value = Math.round(100 - (value / 100) * 100)
    this._trans = ((trans / 100) * 1).toFixed(2)
    this._handleChange()
  }

  // 传入颜色字符串
  string2rate(str) {
    let arr = str.split(/rgba\(|\s|\,|\)|\%/gi).reduce((sum, item) => (item ? [...sum, +item] : sum), [])
    const { h, s, v } = rgb2hsv.apply(null, arr)

    return {
      satLeft: (s / 100) * 100,
      valueTop: 100 - (v / 100) * 100,
      hueLeft: 100 - (h / 360) * 100,
      transLeft: 100
    }
  }

  blendent(type = 'similar', options) {
    const arr = this['_' + type].call(this, options)
    return arr
      .reduce((sum, hue) => [...sum, hsv2rgb.call(null, hue, this._saturation, this._value)], [])
      .map(item =>
        Number(this._trans) === 1
          ? `rgb(${item.r}, ${item.g}, ${item.b})`
          : `rgba(${item.r}, ${item.g}, ${item.b}, ${this._trans})`
      )
  }

  // 获取互补色
  _reverse() {
    return [this._hue, this._hue > 180 ? this._hue - 180 : this._hue + 180]
  }

  /**
   * 获取近似色
   * @param {Number} number 需要获取几组近似色
   */
  _similar(number = 3) {
    let arr = [this._hue]
    while (number) {
      arr.push(
        this._hue + this._chunkAngle * number > 360
          ? this._hue + this._chunkAngle * number - 360
          : this._hue + this._chunkAngle * number
      )
      arr.unshift(
        this._hue - this._chunkAngle * number < 0
          ? this._hue - this._chunkAngle * number + 360
          : this._hue - this._chunkAngle * number
      )
      number--
    }
    return arr
  }

  // 获取三角色
  _triangle() {
    return [
      this._hue,
      this._hue + 120 > 360 ? this._hue - 240 : this._hue + 120,
      this._hue + 240 > 360 ? this._hue - 120 : this._hue + 240
    ]
  }

  /**
   * 获取分裂互补色
   * @param {Boolean} flag 第一个向前或者向后取值
   */
  _complement(flag = true) {
    return [
      this._hue,
      flag
        ? this._hue + this._chunkAngle * 2 > 360
          ? this._hue + this._chunkAngle * 2 - 360
          : this._hue + this._chunkAngle * 2
        : this._hue - this._chunkAngle * 2 < 0
        ? 360 + this._hue - this._chunkAngle * 2
        : this._hue - this._chunkAngle * 2,
      this._hue + this._chunkAngle + 180 > 360 ? this._hue + this._chunkAngle - 180 : this._hue + this._chunkAngle + 180
    ]
  }

  /**
   * 获取双分裂互补色
   * @param {Boolean} flag 第一个向前或者向后取值
   */
  _doubleComplement(flag = true) {
    return [
      this._hue,
      flag
        ? this._hue + this._chunkAngle * 2 > 360
          ? 360 - this._hue + this._chunkAngle * 2
          : this._hue + this._chunkAngle * 2
        : this._hue - this._chunkAngle * 2 < 0
        ? 360 + this._hue + this._chunkAngle * 2
        : this._hue - this._chunkAngle * 2,
      flag
        ? this._hue + 180 > 360
          ? this._hue - 180
          : this._hue + 180
        : this._hue - 180 < 0
        ? this._hue + 180
        : this._hue - 180,
      flag
        ? this._hue + this._chunkAngle * 2 + 180 > 360
          ? this._hue + this._chunkAngle * 2 - 180
          : this._hue + this._chunkAngle * 2 + 180
        : this._hue + this._chunkAngle * 2 - 180 < 0
        ? this._hue + this._chunkAngle * 2 + 180
        : this._hue + this._chunkAngle * 2 - 180
    ]
  }

  // 正方形配色
  _square() {
    let chunkQuarter = 360 / 4
    return [
      this._hue,
      this._hue + chunkQuarter > 360 ? this._hue + chunkQuarter - 360 : this._hue + chunkQuarter,
      this._hue + 180 > 360 ? this._hue - 180 : this._hue + 180,
      this._hue + chunkQuarter + 180 > 360 ? this._hue + chunkQuarter - 180 : this._hue + chunkQuarter + 180
    ]
  }

  _handleChange() {
    const { _hue: hue, _saturation: saturation, _value: value, _trans: trans } = this
    const { r, g, b } = hsv2rgb(hue, saturation, value)

    this.output = Number(trans) === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${trans})`

    this.pure = `hsla(${hue}, 100%, 50%, 1)`
  }
}
