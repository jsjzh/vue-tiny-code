<template>
  <div class="palette">
    <div ref="dish" class="dish">
      <i class="sector" v-for="item in count" :key="item" :style="{'transform': `rotate(${item * 360 / count}deg)`, 'color' : `hsl(${item * 360 / count}, 100%, 50%)`}"></i>
      <i class="dot" :style="{top: `${dotTop}px`, left: `${dotLeft}px`}">&#x2716;</i>
    </div>
    <div style="display: flex;justify-content: center;align-items: center; margin-top: 20px">
      <div v-for="(item, index) in colorArr" :key="index" style="width: 50px;height: 50px" :style="{'background-color': item}"></div>
    </div>
  </div>
</template>

<script>
let _width = 400;
let _height = 400;
let _radius = _width / 2;

import { getCoords, isInside } from "./util";

import Color from "./color";
import drag from "./drag";

export default {
  props: {
    value: String,
    colorFormat: String
  },

  data() {
    const color = new Color({
      format: this.colorFormat,
      count: 12 * 5
    });
    return {
      count: color.get("count"),
      color,
      dotTop: _width / 2,
      dotLeft: _width / 2,
      colorArr: []
    };
  },
  methods: {
    update() {
      const hue = this.color.get("hue");
      const saturation = this.color.get("saturation");
      const value = this.color.get("value");
    },
    handleDreg(event) {
      let gbcr = this.$refs["dish"].getBoundingClientRect();

      let top = event.clientY - gbcr.top;
      let left = event.clientX - gbcr.left;

      // 对圆形的边界情况进行处理
      if (!!isInside(left, top, _radius)) {
        let k = (top - _radius) / (left - _radius);
        let b = _radius - _radius * k;
        let coords = getCoords(k, b, -_radius, -_radius, _radius);

        left > _radius
          ? ((top = coords[1][1]), (left = coords[1][0]))
          : ((top = coords[0][1]), (left = coords[0][0]));
      }

      this.dotTop = top;
      this.dotLeft = left;

      function getAngle(x0, y0, x, y) {
        let a = x0 - x;
        let b = y0 - y;
        let result = Math.atan2(a, b) / Math.PI * 180;
        return result > 0 ? 360 - result : Math.abs(result);
      }
      let angle = getAngle(_radius, _radius, left, top);
      this.color.set("hue", angle);

      // debounce函数用来包裹我们的事件
      // const debounce = (fn, delay) => {
      //   let timer = null;
      //   return function() {
      //     let ctx = this;
      //     let args = arguments;
      //     clearTimeout(timer);
      //     timer = setTimeout(function() {
      //       fn.apply(ctx, args);
      //     }, delay);
      //   };
      // };

      // reverse
      // similar
      // triangle
      // complement
      // doubleComplement
      // square
      this.colorArr = this.color.blendent("similar", 3);
    }
  },
  mounted() {
    // const value = this.value;
    // value && this.color.fromString(value);

    drag(this.$refs["dish"], {
      start: event => this.handleDreg(event),
      move: event => this.handleDreg(event),
      end: event => this.handleDreg(event)
    });

    this.update();
  }
};
</script>

<style lang="scss" scoped>
$paletteWidth: 400px;
$paletteHeight: 400px;

.palette {
  position: fixed;
  width: $paletteWidth;
  height: $paletteHeight;
  top: 50%;
  left: 50%;
  margin: (-($paletteWidth / 2)) (-($paletteHeight / 2));
  // overflow: hidden;
  cursor: pointer;
  .dish {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform: rotate(-(360 / 12 * 5) deg);
  }
  .sector {
    width: $paletteWidth;
    height: $paletteWidth;
    position: absolute;
    clip: rect(0 $paletteWidth $paletteWidth $paletteWidth / 2);
    overflow: hidden;
  }
  .sector::after {
    content: "";
    width: 100%;
    height: 100%;
    background: currentColor;
    position: absolute;
    clip: rect(0 $paletteWidth / 2 $paletteWidth 0);
    transform: rotate(30deg);
    border-radius: 50%;
  }
  .dot {
    position: absolute;
    transform: translate(-50%, -50%);
    color: black;
    top: 200px;
    left: 200px;
    cursor: pointer;
    font-weight: bolder;
    font-style: inherit;
  }
}
</style>


