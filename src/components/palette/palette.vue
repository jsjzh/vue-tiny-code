<template>
  <div class="palette-container">
    <div class="show-stage">
      <div @click="handleGetColor(item)" v-for="(item, index) in colorArr" :key="index" style="height: 50%;cursor: cell;" :style="{'background-color':item, 'width': `${100/(colorArr.length + 1)}%`}"></div>
    </div>
    <div class="palette">
      <div ref="dish" class="dish">
        <i class="sector" v-for="item in count" :key="item" :style="{'transform': `rotate(${item * 360 / count}deg)`, 'color' : `hsl(${item * 360 / count}, 100%, 50%)`}"></i>
        <i class="dot" :style="{top: `${dotTop}px`, left: `${dotLeft}px`}">&#x2716;</i>
      </div>
    </div>
    <div ref="saturation" class="bar bar-one">
      <div class="contro"></div>
    </div>
    <div ref="lightness" class="bar bar-two">
      <div class="contro"></div>
    </div>
    <div class="text-stage">
      {{ currentColor }}
    </div>
  </div>

</template>

<script>
let _width = 200;
let _height = 200;
let _radius = _width / 2;

import { getCoords, isInside } from "./util";

import Color from "./color";
import drag from "./drag";

export default {
  props: {
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
      colorArr: [],
      currentColor: null
    };
  },
  methods: {
    handleGetColor(color) {
      this.currentColor = color;
    },
    update() {
      const hue = this.color.get("hue");
      const saturation = this.color.get("saturation");
      const value = this.color.get("value");
    },
    handleDreg(event, elem) {
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

      // reverse
      // similar
      // triangle
      // complement
      // doubleComplement
      // square
      this.color.set("hue", angle);
      this.colorArr = this.color.blendent("square", 10);

      let barOne = document.querySelector(".bar-one");
      barOne.style.backgroundImage = `linear-gradient(${
        this.color.value
      }, gray)`;
    },
    handleDregBar(event, elem) {
      let cont = Array.prototype.filter.call(
        elem.childNodes,
        el => el.className === "contro"
      )[0];
      const { top, height } = elem.getBoundingClientRect();
      let rate = (event.clientY - top) / height;
      let _top = rate < 0 ? 0 * 100 : rate > 1 ? 1 * 100 : rate * 100;
      cont.style.top = `${_top}%`;
      if (elem.classList.contains("bar-one")) {
        this.color.set("saturation", Math.abs(100 - _top));
        this.colorArr = this.color.blendent("square", 10);
      } else if (elem.classList.contains("bar-two")) {
        this.color.set("value", Math.abs(50 - _top / 2));
        this.colorArr = this.color.blendent("square", 10);
        let barOne = document.querySelector(".bar-one");
        barOne.style.backgroundImage = `linear-gradient(${
          this.color.value
        }, gray)`;
      }
    }
  },
  mounted() {
    // const value = this.value;
    // value && this.color.fromString(value);

    const { dish, saturation, lightness } = this.$refs;

    drag(dish, {
      start: (event, elem) => this.handleDreg(event, elem),
      move: (event, elem) => this.handleDreg(event, elem),
      end: (event, elem) => this.handleDreg(event, elem)
    });

    drag(saturation, {
      start: (event, elem) => this.handleDregBar(event, elem),
      move: (event, elem) => this.handleDregBar(event, elem),
      end: (event, elem) => this.handleDregBar(event, elem)
    });

    drag(lightness, {
      start: (event, elem) => this.handleDregBar(event, elem),
      move: (event, elem) => this.handleDregBar(event, elem),
      end: (event, elem) => this.handleDregBar(event, elem)
    });

    this.update();
  }
};
</script>

<style lang="scss" scoped>
$paletteWidth: 200px;
$paletteHeight: 200px;
.palette-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(39, 37, 37);
  width: 350px;
  height: 250px;
  z-index: 1000;
}
.show-stage {
  position: absolute;
  top: -50px;
  width: 100%;
  height: 50px;
  background-color: rgb(39, 37, 37);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.text-stage {
  color: white;
  position: absolute;
  bottom: -30px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: rgb(39, 37, 37);
  text-align: center;
}
.bar {
  position: absolute;
  top: 50%;
  width: 25px;
  height: 200px;
  transform: translateY(-50%);
  cursor: n-resize;
}
// 饱和度
.bar-one {
  right: 6%;
  background-image: linear-gradient(hsl(0, 100%, 50%), gray);
}
// 明度
.bar-two {
  right: 22%;
  background-image: linear-gradient(white, black);
}
.contro {
  position: absolute;
  width: 100%;
  height: 5px;
  top: 0;
  left: 0;
  background-color: brown;
  transform: translateY(-50%);
}
.palette {
  position: absolute;
  width: $paletteWidth;
  height: $paletteHeight;
  top: 50%;
  left: 35%;
  margin: (-($paletteWidth / 2)) (-($paletteHeight / 2));
  // overflow: hidden;
  cursor: crosshair;
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