<template>
  <div class="palette-pro-container">
    <div ref="dotStage" class="color-stage">
      <div class="current-bgd"></div>
      <div class="white-bgd"></div>
      <div class="black-bgd"></div>
      <div ref="dot" class="color-dot"></div>
    </div>
    <div class="controller-stage">
      <div class="current-color"></div>
      <div class="controller-bars">
        <div ref="hueStage" class="bar hue-bar">
          <div ref="hue" class="slider hue"></div>
        </div>
        <div ref="transStage" class="bar trans-bar">
          <div ref="trans" class="slider trans"></div>
        </div>
      </div>
    </div>
    <!-- <div class="current-color-text-stage">
      <div class="input-stage">
        <input type="text" class="current-color-text">
        <div class="color-type-toggle"></div>
      </div>
    </div> -->
  </div>
</template>


<script>
import drag from "./drag.js";

export default {
  name: "palettePro",
  data() {
    return {};
  },
  methods: {
    handleDot(event, elem) {
      const dot = this.$refs["dot"];
      // debugger;
      const { width, height, left, top } = elem.getBoundingClientRect();
      let _left = event.clientX - left;
      let _top = event.clientY - top;

      _left = _left > 0 ? Math.min(width, _left) : 0;
      _top = _top > 0 ? Math.min(height, _top) : 0;

      dot.style.left = _left / width * 100 + "%";
      dot.style.top = _top / height * 100 + "%";
    },
    handleBar(event, elem) {
      const { hue, trans } = this.$refs;
      const _className = elem.className;
      // debugger;
      const { width, left } = elem.getBoundingClientRect();
      let _left = event.clientX - left;

      _left = _left > 0 ? Math.min(width, _left) : 0;
      if (_className.indexOf("hue") !== -1) {
        hue.style.left = _left / width * 100 + "%";
      } else if (_className.indexOf("trans") !== -1) {
        trans.style.left = _left / width * 100 + "%";
      }
    }
  },
  mounted() {
    const { dotStage, hueStage, transStage } = this.$refs;

    drag(dotStage, {
      start: (event, elem) => this.handleDot(event, elem),
      move: (event, elem) => this.handleDot(event, elem),
      end: (event, elem) => this.handleDot(event, elem)
    });
    drag(hueStage, {
      start: (event, elem) => this.handleBar(event, elem),
      move: (event, elem) => this.handleBar(event, elem),
      end: (event, elem) => this.handleBar(event, elem)
    });
    drag(transStage, {
      start: (event, elem) => this.handleBar(event, elem),
      move: (event, elem) => this.handleBar(event, elem),
      end: (event, elem) => this.handleBar(event, elem)
    });
  }
};
</script>


<style scoped>
.palette-pro-container {
  position: relative;
  width: 300px;
  height: 500px;
  margin: 50px auto;
  background-color: #fff;
  box-shadow: 1px 1px 5px #949494;
}
/* color-stage */
.color-stage {
  position: absolute;
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.white-bgd {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, white, rgba(255, 255, 255, 0));
}
.black-bgd {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, black, rgba(255, 255, 255, 0));
}
.current-bgd {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: red;
}
.color-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #fff;
  box-shadow: 1px 1px 1px #949494;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* color-stage */

/* controller-stage */
.controller-stage {
  position: absolute;
  width: 100%;
  top: 220px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.current-color {
  width: 40px;
  height: 40px;
  background-color: red;
  border-radius: 50%;
}
.controller-bars {
  width: 65%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.bar {
  position: relative;
  width: 100%;
  height: 15px;
  border-radius: 3px;
}
.hue-bar {
  background-image: linear-gradient(
    to right,
    red 0,
    #f0f 17%,
    blue 33%,
    cyan 50%,
    lime 67%,
    #ff0 83%,
    red
  );
}
.trans-bar {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), red);
}
.slider {
  position: absolute;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  margin: -3px 0;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 1px 1px 5px#949494;
}
/* .hue {
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: #000;
}
.trans {
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: #000;
} */
/* controller-stage */
/* current-color-text-stage */
.current-color-text-stage {
  position: absolute;
  top: 290px;
}
/* current-color-text-stage */
</style>
