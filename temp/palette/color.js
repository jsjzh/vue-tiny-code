const hsv2hsl = function (hue, sat, val) {
  return [hue, (sat * val / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue)) || 0, hue / 2];
};

const hsl2hsv = function (hue, sat, light) {
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

const getBracketValue = function (str) {
  return str.split(/\s|\,/g).filter(val => val)
}

export default class Color {
  constructor(options = {}) {

    this._hue = 0;
    this._saturation = 100;
    this._value = 100;
    this._alpha = 100;

    this.format = "hsl";
    this.value = "";

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key]
      }
    }

    this.onChange();
  }
  fromString(value) {
    if (!value) {
      this._hue = 0;
      this._saturation = 100;
      this._value = 100;
      this.onChange();
      return;
    }

    const fromHSV = (h, s, v) => {
      this._hue = Math.max(0, Math.min(360, h));
      this._saturation = Math.max(0, Math.min(100, s));
      this._value = Math.max(0, Math.min(100, v));

      this.onChange();
    }

    if (value.indexOf("hsl") !== -1) {
      const parts = getBracketValue(value.replace(/hsl(a)?|\(|\)/gim, ""))
      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(parts[3]) * 100);
      } else if (parts.length === 3) {
        this._alpha = 100;
      }
      if (parts.length >= 3) {
        const { h, s, v } = hsl2hsv(parts[0], parts[1], parts[2]);
        fromHSV(h, s, v);
      }
    }
  }

  // 当颜色改变的时候，最终生成颜色的函数
  onChange() {
    const { _hue, _saturation, _value, format } = this;
    switch (format) {
      case "hsl":
        const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
        this.value = `hsl(${_hue}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%)`;
        break;
      default:
        console.log("nope");
        break;
    }
    console.log(this);
  }
}