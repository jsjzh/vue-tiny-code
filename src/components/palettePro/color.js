export default class Color {
  constructor(options) {

    this.count = options.precision || 12 * 5;
    this.pure = options.pure || "";
    this.value = options.value || "";
    this.format = options.format || "hsla";

    this.recomColors = ["hsla(4, 90%, 100%, 1)", "hsla(4, 90%, 58%, 1)", "hsla(340, 82%, 52%, 1)", "hsla(291, 64%, 42%, 1)", "hsla(262, 52%, 47%, 1)", "hsla(231, 48%, 48%, 1)", "hsla(207, 90%, 54%, 1)", "hsla(199, 98%, 48%, 1)", "hsla(187, 100%, 42%, 1)", "hsla(174, 100%, 29%, 1)", "hsla(122, 39%, 49%, 1)", "hsla(88, 50%, 53%, 1)", "hsla(66, 70%, 54%, 1)", "hsla(54, 100%, 62%, 1)", "hsla(45, 100%, 51%, 1)", "hsla(36, 100%, 50%, 1)", "hsla(14, 100%, 57%, 1)", "hsla(16, 25%, 38%, 1)", "hsla(0, 0%, 62%, 1)", "hsla(200, 18%, 46%, 1)"];

    this._hue = 0;
    this._saturation = 100;
    this._lightness = 50;
    this._trans = 1;
    this._value = "";

    this._chunkAngle = 360 / this.count;

    this._handleChange();
  }

  set(prop, value) {
    this[`_${prop}`] = value;
    this._handleChange();
  }

  get(prop) {
    return this[prop];
  }

  rate2hsla(sat, light, hue, trans) {
    debugger
    this._hue = Math.abs(hue / 100 * 360 - 360);
    this._saturation = sat;
    // this._lightness = (1 - sat / 200) * (100 - light);
    this._lightness = (50 - light / 2) * (1 + (100 - sat) / 100);
    this._trans = Math.floor(trans / 100 * 100) / 100;
    this._handleChange();
  }

  blendent(type = "similar", options) {
    this._type = type;
    const arr = this["_" + type].call(this, options);
    return arr.reduce((sum, hue) => ([...sum, `hsla(${hue}, ${this._saturation}%, ${this._lightness}%, ${this._trans})`]), [])
  }

  // 获取互补色
  _reverse() {
    return [this._hue, this._hue > 180 ? this._hue - 180 : this._hue + 180];
  }

  /**
   * 获取近似色
   * @param {Number} number 需要获取几组近似色
   */
  _similar(number = 3) {
    let arr = [this._hue];
    while (number) {
      arr.push((this._hue + this._chunkAngle * number) > 360 ? this._hue + this._chunkAngle * number - 360 : this._hue + this._chunkAngle * number);
      arr.unshift((this._hue - this._chunkAngle * number) < 0 ? this._hue - this._chunkAngle * number + 360 : this._hue - this._chunkAngle * number);
      number--;
    }
    return arr;
  }

  // 获取三角色
  _triangle() {
    return [this._hue, this._hue + 120 > 360 ? this._hue - 240 : this._hue + 120, this._hue + 240 > 360 ? this._hue - 120 : this._hue + 240]
  }

  /**
   * 获取分裂互补色
   * @param {Boolean} flag 第一个向前或者向后取值
   */
  _complement(flag = true) {
    return [this._hue, flag ? this._hue + this._chunkAngle * 2 > 360 ? this._hue + this._chunkAngle * 2 - 360 : this._hue + this._chunkAngle * 2 : this._hue - this._chunkAngle * 2 < 0 ? 360 + this._hue - this._chunkAngle * 2 : this._hue - this._chunkAngle * 2, this._hue + this._chunkAngle + 180 > 360 ? this._hue + this._chunkAngle - 180 : this._hue + this._chunkAngle + 180];
  }

  /**
   * 获取双分裂互补色
   * @param {Boolean} flag 第一个向前或者向后取值
   */
  _doubleComplement(flag = true) {
    return [this._hue, flag ? this._hue + this._chunkAngle * 2 > 360 ? 360 - this._hue + this._chunkAngle * 2 : this._hue + this._chunkAngle * 2 : this._hue - this._chunkAngle * 2 < 0 ? 360 + this._hue + this._chunkAngle * 2 : this._hue - this._chunkAngle * 2, flag ? this._hue + 180 > 360 ? this._hue - 180 : this._hue + 180 : this._hue - 180 < 0 ? this._hue + 180 : this._hue - 180, flag ? this._hue + this._chunkAngle * 2 + 180 > 360 ? this._hue + this._chunkAngle * 2 - 180 : this._hue + this._chunkAngle * 2 + 180 : this._hue + this._chunkAngle * 2 - 180 < 0 ? this._hue + this._chunkAngle * 2 + 180 : this._hue + this._chunkAngle * 2 - 180];
  }

  // 正方形配色
  _square() {
    let chunkQuarter = 360 / 4;
    return [this._hue, this._hue + chunkQuarter > 360 ? this._hue + chunkQuarter - 360 : this._hue + chunkQuarter, this._hue + 180 > 360 ? this._hue - 180 : this._hue + 180, this._hue + chunkQuarter + 180 > 360 ? this._hue + chunkQuarter - 180 : this._hue + chunkQuarter + 180]
  }

  _handleChange() {
    this._value = `hsla(${this._hue}, ${this._saturation}%, ${this._lightness}%, ${this._trans})`;
    this.pure = `hsla(${this._hue}, 100%, 50%, 1)`;
    switch (this.format) {
      case "hsla":
        this.value = this._value
        break;

      default:
        break;
    }
    console.log(this._value);
  }

}