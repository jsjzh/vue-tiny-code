export default class Color {
  constructor(options) {
    this._hue = 0;
    this._saturation = 100;
    this._lightness = 50;

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] && (this[key] = options[key]);
      }
    }
  }

}