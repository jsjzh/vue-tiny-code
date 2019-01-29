function isOnePointZero(n) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1
}

function isPercentage(n) {
  return typeof n === 'string' && n.indexOf('%') !== -1
}

const bound01 = function(value, max) {
  if (isOnePointZero(value)) value = '100%'

  const processPercent = isPercentage(value)
  value = Math.min(max, Math.max(0, parseFloat(value)))

  // Automatically convert percentage into number
  if (processPercent) {
    value = parseInt(value * max, 10) / 100
  }

  // Handle floating point rounding errors
  if (Math.abs(value - max) < 0.000001) {
    return 1
  }

  // Convert into [0, 1] range if it isn't already
  return (value % max) / parseFloat(max)
}

export function hsv2rgb(h, s, v) {
  h = bound01(h, 360) * 6
  s = bound01(s, 100)
  v = bound01(v, 100)

  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const mod = i % 6
  const r = [v, q, p, p, t, v][mod]
  const g = [t, v, v, q, p, p][mod]
  const b = [p, p, t, v, v, q][mod]

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

export function hsv2hsl(h, s, v) {
  return {
    h: h,
    s: (s * v) / ((h = (2 - s) * v) < 1 ? h : 2 - h) || 0,
    l: h / 2
  }
}

export function rgb2hsv(r, g, b) {
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  let v = max

  const d = max - min
  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0 // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return {
    h: h * 360,
    s: s * 100,
    v: v * 100
  }
}

export function hsl2hsv(h, s, l) {
  s = s / 100
  l = l / 100
  let smin = s
  const lmin = Math.max(l, 0.01)
  let sv
  let v

  l *= 2
  s *= l <= 1 ? l : 2 - l
  smin *= lmin <= 1 ? lmin : 2 - lmin
  v = (l + s) / 2
  sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s)

  return {
    h: h,
    s: sv * 100,
    v: v * 100
  }
}

const INT_HEX_MAP = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F'
}

export function toHex(r, g, b) {
  const hexOne = function(value) {
    value = Math.min(Math.round(value), 255)
    const high = Math.floor(value / 16)
    const low = value % 16
    return '' + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low)
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) return ''

  return '#' + hexOne(r) + hexOne(g) + hexOne(b)
}

// const HEX_INT_MAP = {
//   A: 10,
//   B: 11,
//   C: 12,
//   D: 13,
//   E: 14,
//   F: 15
// };

// export function parseHex(hex) {
//   if (hex.length === 2) {
//     return (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 + (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]);
//   }

//   return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1];
// };
