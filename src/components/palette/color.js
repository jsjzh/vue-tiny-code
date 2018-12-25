const hsv2hsl = function(hue, sat, val) {
  return [hue, (sat * val / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue)) || 0, hue / 2];
};

const hsl2hsv = function(hue, sat, light) {
  sat = sat / 100;
  light = light / 100;
  let smin = sat;
  const lmin = Math.max(light, 0.01);
  let sv;
  let v;

  light *= 2;
  sat *= (light <= 1) ? light : 2 - light;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  v = (light + sat) / 2;
  sv = light === 0 ? (2 * smin) / (lmin + smin) : (2 * sat) / (light + sat);

  return {
    h: hue,
    s: sv * 100,
    v: v * 100
  };
};

// -------------------------------------------------------------------------------------------------------
/**
 * RGB颜色转换为十六进制
 * 摘自 https://www.zhangxinxu.com/wordpress/2010/03/javascript-hex-rgb-hsl-color-convert/
 */
String.prototype.colorHex = function() {
  let that = this;
  //十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(that)) {
    let aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = '0' + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    let aNum = that.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      let numHex = "#";
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i]);
      }
      return numHex;
    }
  }
  return that;
};

/**
 * 十六进制颜色转为RGB
 * 摘自 https://www.zhangxinxu.com/wordpress/2010/03/javascript-hex-rgb-hsl-color-convert/
 */
String.prototype.colorRgb = function() {
  let sColor = this.toLowerCase();
  //十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    let sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return "RGB(" + sColorChange.join(",") + ")";
  }
  return sColor;
};

/**
 * RGB 颜色值转换为 HSL.
 * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, 和 b 需要在 [0, 255] 范围内
 * 返回的 h, s, 和 l 在 [0, 1] 之间
 * 摘自 https://www.zhangxinxu.com/wordpress/2010/03/javascript-hex-rgb-hsl-color-convert/
 *
 * @param   Number  r       红色色值
 * @param   Number  g       绿色色值
 * @param   Number  b       蓝色色值
 * @return  Array           HSL各值数组
 */
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

/**
 * HSL颜色值转换为RGB. 
 * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * h, s, 和 l 设定在 [0, 1] 之间
 * 返回的 r, g, 和 b 在 [0, 255]之间
 * 摘自 https://www.zhangxinxu.com/wordpress/2010/03/javascript-hex-rgb-hsl-color-convert/
 *
 * @param   Number  h       色相
 * @param   Number  s       饱和度
 * @param   Number  l       亮度
 * @return  Array           RGB色值数值
 */
function hslToRgb(h, s, l) {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * 利用 DOM 特性，获取 RGB 值
 * 如果带透明度，则返回 RGBA
 * 摘自 https://www.zhangxinxu.com/wordpress/2010/03/javascript-hex-rgb-hsl-color-convert/
 * @param {*} color 
 */
function colorToRgb(color) {
  let div = document.createElement('div');
  div.style.backgroundColor = color;
  document.body.appendChild(div);
  let c = window.getComputedStyle(div).backgroundColor;
  document.body.removeChild(div);
  return c;
};

// -------------------------------------------------------------------------------------------------------

const getBracketValue = function(str) {
  return str.split(/\s|\,/g).filter(val => val)
}

export default class Color {
  constructor(options = {}) {

    this._hue = 0;
    this._saturation = 100;
    this._value = 50;
    this._alpha = 100;
    // 获取的相似度，本意就是色相的分块细度

    this.format = "hsl";
    this.value = "";
    this.count = "";

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key]
      }
    }

    this._onChange();
  }

  getColors(type, color) {
    return this[type].apply(this, Array.prototype.slice(null, arguments)).reduce((sum, cor) => ([...sum, color.replace(/hsl\(\s*\d+\s*/, `hsl(${cor}`)]), [])
  }

  /**
   * 获取 (xxx,yyy,zzz) 中的 xxx yyy zzz
   * @param {String} color rgb(xxx,yyy,zzz) or hsl(xxx,yyy,zzz)
   * @param {Boolean} flag 是否要去除 hsl 中的 %
   */
  getColorNumber(color, flag = true) {
    return color.split(/[hsl\(,rgb\(,\,\s+,,\)]/i).reduce((sum, item) => (item ? [...sum, flag ? item.match("%") ? item.slice(0, -1) : item : item] : sum), [])
  }

  set(prop, value) {
    this[`_${prop}`] = value;
    this._onChange();
  }

  get(prop) {
    return this[`_${prop}`] ? this[`_${prop}`] : this[prop]
  }

  fromString(value) {
    if (!value) {
      this._hue = 0;
      this._saturation = 100;
      this._value = 50;
      this._onChange();
      return;
    }

    const fromHSV = (h, s, v) => {
      this._hue = Math.max(0, Math.min(360, h));
      this._saturation = Math.max(0, Math.min(100, s));
      this._value = Math.max(0, Math.min(100, v));

      this._onChange();
    }

    if (value.indexOf("hsl") !== -1) {
      const parts = getBracketValue(value.replace(/hsl(a)?|\(|\)/gim, ""))
      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(parts[3]) * 100);
      } else if (parts.length === 3) {
        this._alpha = 100;
      }
      if (parts.length >= 3) {
        const {
          h,
          s,
          v
        } = hsl2hsv(parts[0], parts[1], parts[2]);
        fromHSV(h, s, v);
      }
    }
  }

  blendent(type = "similar", options) {
    this._type = type;
    const arr = this["_" + type].call(this, options);
    return arr.reduce((sum, hue) => ([...sum, `hsl(${hue}, ${this._saturation}%, ${this._value}%)`]), [])
  }

  // 获取互补色
  _reverse() {
    return [this._hue, this._hue > 180 ? this._hue - 180 : this._hue + 180];
  }

  /**
   * 获取近似色
   * @param {Number} number 需要获取几组近似色
   */
  _similar(number = 1) {
    let chunkAngle = 360 / this.count;
    let arr = [this._hue];
    while (number) {
      arr.push((this._hue + chunkAngle * number) > 360 ? this._hue + chunkAngle * number - 360 : this._hue + chunkAngle * number);
      arr.unshift((this._hue - chunkAngle * number) < 0 ? this._hue - chunkAngle * number + 360 : this._hue - chunkAngle * number);
      number--;
    }
    return arr
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
    let chunkAngle = 360 / this.count;
    return [this._hue, flag ? this._hue + chunkAngle * 2 > 360 ? this._hue + chunkAngle * 2 - 360 : this._hue + chunkAngle * 2 : this._hue - chunkAngle * 2 < 0 ? 360 + this._hue - chunkAngle * 2 : this._hue - chunkAngle * 2, this._hue + chunkAngle + 180 > 360 ? this._hue + chunkAngle - 180 : this._hue + chunkAngle + 180];
  }

  /**
   * 获取双分裂互补色
   * @param {Boolean} flag 第一个向前或者向后取值
   */
  _doubleComplement(flag = true) {
    let chunkAngle = 360 / this.count;
    return [this._hue, flag ? this._hue + chunkAngle * 2 > 360 ? 360 - this._hue + chunkAngle * 2 : this._hue + chunkAngle * 2 : this._hue - chunkAngle * 2 < 0 ? 360 + this._hue + chunkAngle * 2 : this._hue - chunkAngle * 2, flag ? this._hue + 180 > 360 ? this._hue - 180 : this._hue + 180 : this._hue - 180 < 0 ? this._hue + 180 : this._hue - 180, flag ? this._hue + chunkAngle * 2 + 180 > 360 ? this._hue + chunkAngle * 2 - 180 : this._hue + chunkAngle * 2 + 180 : this._hue + chunkAngle * 2 - 180 < 0 ? this._hue + chunkAngle * 2 + 180 : this._hue + chunkAngle * 2 - 180];
  }

  // 正方形配色
  _square() {
    let chunkQuarter = 360 / 4;
    return [this._hue, this._hue + chunkQuarter > 360 ? this._hue + chunkQuarter - 360 : this._hue + chunkQuarter, this._hue + 180 > 360 ? this._hue - 180 : this._hue + 180, this._hue + chunkQuarter + 180 > 360 ? this._hue + chunkQuarter - 180 : this._hue + chunkQuarter + 180]
  }

  // 当颜色改变的时候，最终生成颜色的函数
  _onChange() {
    const {
      _hue,
      _saturation,
      _value,
      format
    } = this;
    switch (format) {
      case "hsl":
        const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
        this.value = `hsl(${_hue}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%)`;
        break;
      default:
        console.log("nope");
        break;
    }
    // console.log(this);
  }
}