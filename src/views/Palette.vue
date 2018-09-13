<template>
  <div id="palette" class="palette">
    <div id="hsl-h" class="hsl-h">
      <i class="sector" v-for="(item, index) in arr" :key="item" :style="{'transform': `rotate(${index * 360 / arr.length}deg)`, 'color' : `hsl(${index * 360 / arr.length}, 100%, 50%)`}"></i>
    </div>
    <i id="dot" class="dot el-icon-close"></i>
  </div>
</template>

<script>
let _width = 400;
let _height = 400;
let _radius = _width / 2;

import { getCoords, _d_, _dd_ } from "./util";

export default {
  data() {
    return {
      arr: new Array(12 * 5)
    };
  },
  mounted() {
    let _dot = document.getElementById("dot");
    let _palette = document.getElementById("palette");
    let _hsl = document.getElementById("hsl-h");
    let _app = document.getElementById("app");
    let _container = _app.parentNode;

    _hsl.onmousedown = function(e) {
      e = e || window.event;
      // 鼠标点击下去的位置距离浏览器左边的距离 - 物体相对他的最近的元素（拥有 position 属性）的左边的距离 = 点击的位置和 物体相对的那个拥有定位的属性的最近的祖元素的左边的距离
      let left = e.clientX - _palette.offsetLeft;
      let top = e.clientY - _palette.offsetTop;

      _dot.style.top = top + "px";
      _dot.style.left = left + "px";

      let diffX = e.clientX - left;
      let diffY = e.clientY - top;

      let _div = document.createElement("div");
      _div.id = "dotDrawing";
      _div.style.position = "fixed";
      _div.style.width = "100%";
      _div.style.height = "100%";
      _div.style.zIndex = "9999";
      _container.appendChild(_div);

      _div.onmousemove = function(e) {
        e = e || window.event;
        let left = e.clientX - diffX;
        let top = e.clientY - diffY;

        // 边界处理
        if (_d_(_radius - left, 2) + _d_(_radius - top, 2) > _d_(_radius, 2)) {
          let k = (top - _radius) / (left - _radius);
          let b = _radius - _radius * k;
          let coords = getCoords(k, b, -_radius, -_radius, _radius);

          left > _radius
            ? ((top = coords[1][1]), (left = coords[1][0]))
            : ((top = coords[0][1]), (left = coords[0][0]));
        }

        _dot.style.top = top + "px";
        _dot.style.left = left + "px";

        function getAngle(x0, y0, x, y) {
          let a = x0 - x;
          let b = y0 - y;
          let result = Math.atan2(a, b) / Math.PI * 180;
          return result > 0 ? 360 - result : Math.abs(result);
        }
        let angle = getAngle(_radius, _radius, left, top);
        _palette.style.backgroundColor = `hsl(${angle}, 100%, 50%)`;
      };

      _div.onmouseup = function(e) {
        _div.onmousemove = null;
        _div.onmouseup = null;
        _container.removeChild(_div);
      };
    };

    // let _palette = document.getElementById("palette");
    // function move(e) {
    //   console.log(this.target);
    //   e.style.top = e.y + "px";
    //   e.style.left = e.x + "px";
    // }
    // _palette.addEventListener("mousedown", function(e) {
    //   let _dot = e.target;
    //   if (_dot.id !== "dot") return;
    //   _dot.style.position = "fixed";
    //   _dot.style.top = e.y + "px";
    //   _dot.style.left = e.x + "px";
    //   _palette.addEventListener("mousemove", move);
    //   _palette.addEventListener("mouseup", function(e) {
    //     _palette.removeEventListener("mousemove", move);
    //   });
    // });

    // //拖拽功能(主要是触发三个事件：onmousedown\onmousemove\onmouseup)
    // var drag = document.getElementById("dot");

    // //点击某物体时，用drag对象即可，move和up是全局区域，也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)
    // drag.onmousedown = function(e) {
    //   var e = e || window.event; //兼容ie浏览器
    //   var diffX = e.clientX - drag.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离 = 点击时的位置相对于浏览器最左边的距离 - 物体左边框相对于浏览器最左边的距离
    //   var diffY = e.clientY - drag.offsetTop;

    //   /*低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
    //         解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
    //         可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
    //         限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中*/

    //   if (typeof drag.setCapture != "undefined") {
    //     drag.setCapture();
    //   }

    //   document.onmousemove = function(e) {
    //     debugger;
    //     var e = e || window.event; //兼容ie浏览器
    //     var left = e.clientX - diffX;
    //     var top = e.clientY - diffY;

    //     //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
    //     if (left < 0) {
    //       left = 0;
    //     } else if (left > window.innerWidth - drag.offsetWidth) {
    //       left = window.innerWidth - drag.offsetWidth;
    //     }
    //     if (top < 0) {
    //       top = 0;
    //     } else if (top > window.innerHeight - drag.offsetHeight) {
    //       top = window.innerHeight - drag.offsetHeight;
    //     }

    //     //移动时重新得到物体的距离，解决拖动时出现晃动的现象
    //     drag.style.left = left + "px";
    //     drag.style.top = top + "px";
    //   };
    //   document.onmouseup = function(e) {
    //     //当鼠标弹起来的时候不再移动
    //     this.onmousemove = null;
    //     this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）

    //     //修复低版本ie bug
    //     if (typeof drag.releaseCapture != "undefined") {
    //       drag.releaseCapture();
    //     }
    //   };

    // };
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
  // background-color: #eee;
  margin: (-($paletteWidth / 2)) (-($paletteHeight / 2));
  overflow: hidden;
  cursor: pointer;
  .hsl-h {
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
  }
}
</style>


