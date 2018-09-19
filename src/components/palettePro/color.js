export default class Color {
  constructor(options) {
    this._hue = 0;
    this._saturation = 100;
    this._lightness = 50;
    this._trans = 1;

    this._value = "";
    this._pure = "";
    this._format = "hsl";

    this.value = "";
    this.format = "";

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] && (this[key] = options[key]);
      }
    }
    this._handleChange();
  }

  set(prop, value) {
    this[`_${prop}`] = value;
    this._handleChange();
  }

  get(prop) {
    return this[prop];
  }

  rate2hsl(sat, light, hue, trans) {
    this._hue = hue / 100 * 360;
    this._saturation = sat;
    this._lightness = Math.abs(light / 2 - 50);
    this._trans = trans / 100;
    this._handleChange();
  }

  _handleChange() {
    this._value = `hsla(${this._hue}, ${this._saturation}%, ${this._lightness}%, ${this._trans})`;
    this._pure = `hsla(${this._hue}, 100%, 50%, 1)`;
    console.log(this._value);
  }

}