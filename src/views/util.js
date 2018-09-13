export function _d_(x) {
  return Math.pow(x, 2);
}

export function _dd_(x) {
  return Math.sqrt(x)
}
/**
 * 获取直线和圆的交点
 * y = kx + b
 * (x + c)^2 + (y + d)^2 = r^2
 * @param {*} k 
 * @param {*} b 
 * @param {*} c 
 * @param {*} d 
 * @param {*} r 
 */
export function getCoords(k = 1, b = 0, c = 0, d = 0, r = 1) {
  let k2 = _d_(k);
  let r2 = _d_(r);
  let c2 = _d_(c);
  let d2 = _d_(d);
  let b2 = _d_(b);

  let cd2 = 2 * c * d;
  let bc2 = 2 * b * c;
  let bd2 = 2 * b * d;

  let dk = d * k;
  let bk = b * k;

  let k2_1 = (k2 + 1);

  let x_x = _dd_(k2_1 * r2 - c2 * k2 + (cd2 + bc2) * k - d2 - bd2 - b2);
  let y_y = _dd_(k2 * r2 + r2 - c2 * k2 + (cd2 + bc2) * k - d2 - bd2 - b2);

  let X1 = -(x_x + dk + bk + c) / k2_1;
  let Y1 = -(k * (y_y + c) + d * k2 - b) / k2_1;

  let X2 = (x_x - dk - bk - c) / k2_1;
  let Y2 = -(k * (c - y_y) + d * k2 - b) / k2_1;

  return [
    [X1, Y1],
    [X2, Y2]
  ]
}