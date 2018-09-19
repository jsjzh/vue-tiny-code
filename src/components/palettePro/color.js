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

    this.recomColor = [
      "hsl(4, 90%, 58%)",
      "hsl(340, 82%, 52%)",
      "hsl(291, 64%, 42%)",
      "hsl(262, 52%, 47%)",
      "hsl(231, 48%, 48%)",
      "hsl(207, 90%, 54%)",
      "hsl(199, 98%, 48%)",
      "hsl(187, 100%, 42%)",
      "hsl(174, 100%, 29%)",
      "hsl(122, 39%, 49%)",
      "hsl(88, 50%, 53%)",
      "hsl(66, 70%, 54%)",
      "hsl(54, 100%, 62%)",
      "hsl(45, 100%, 51%)",
      "hsl(36, 100%, 50%)",
      "hsl(14, 100%, 57%)",
      "hsl(16, 25%, 38%)",
      "hsl(0, 0%, 62%)",
      "hsl(200, 18%, 46%)"
    ];

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
    this._hue = Math.abs(hue / 100 * 360 - 360);
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