<template>
  <div class="palette-pro-container">
    <div ref="dotStage" class="color-stage">
      <div class="bgd current-bgd" :style="{'backgroundColor': pureColor}"></div>
      <div class="bgd white-bgd"></div>
      <div class="bgd black-bgd"></div>
      <div ref="dot" class="color-dot" :style="{'left': `${dotLeft}%`, 'top': `${dotTop}%`}"></div>
    </div>
    <div class="controller-stage">
      <div class="current-color-stage" @click="handleCopyColor">
        <div class="lucency"></div>
        <div class="current-color" :style="{'backgroundColor': currentColor}"></div>
      </div>
      <div class="controller-bars">
        <div ref="hueStage" class="bar hue-stage">
          <div class="hue-bar"></div>
          <div ref="hue" class="slider" :style="{'left': `${hueLeft}%`}"></div>
        </div>
        <div ref="transStage" class="bar trans-stage">
          <div class="lucency"></div>
          <div class="trans-bar" :style="{'backgroundImage': `linear-gradient(to right, rgba(255, 255, 255, 0), ${pureColor})`}"></div>
          <div ref="trans" class="slider" :style="{'left': `${transLeft}%`}"></div>
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
import drag from "./drag";
import Color from "./color";

export default {
  name: "palettePro",
  data() {
    const color = new Color({});
    return {
      color,
      dotLeft: 50,
      dotTop: 50,
      hueLeft: 50,
      transLeft: 50,
      pureColor: "",
      currentColor: ""
    };
  },
  methods: {
    handleCopyColor() {
      console.log("TODO click copy color", this.currentColor);
    },
    update() {
      this.color.rate2hsl(
        this.dotLeft,
        this.dotTop,
        this.hueLeft,
        this.transLeft
      );
      this.currentColor = this.color.get("_value");
      this.pureColor = this.color.get("_pure");
    },
    handleDot(event, elem) {
      const dot = this.$refs["dot"];
      const { width, height, left, top } = elem.getBoundingClientRect();
      let _left = event.clientX - left;
      let _top = event.clientY - top;

      _left = _left > 0 ? Math.min(width, _left) : 0;
      _top = _top > 0 ? Math.min(height, _top) : 0;

      this.dotLeft = _left / width * 100;
      this.dotTop = _top / height * 100;

      this.update();
    },
    handleBar(event, elem) {
      const { hue, trans } = this.$refs;
      const _className = elem.className;
      const { width, left } = elem.getBoundingClientRect();
      let _left = event.clientX - left;

      _left = _left > 0 ? Math.min(width, _left) : 0;

      if (_className.indexOf("hue") !== -1) {
        this.hueLeft = _left / width * 100;
      } else if (_className.indexOf("trans") !== -1) {
        this.transLeft = _left / width * 100;
      }

      this.update();
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

    this.update();
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
  cursor: crosshair;
}
.bgd {
  position: absolute;
  width: 100%;
  height: 100%;
}
.white-bgd {
  background: linear-gradient(to right, white, rgba(255, 255, 255, 0));
}
.black-bgd {
  background: linear-gradient(to top, black, rgba(255, 255, 255, 0));
}
.current-bgd {
  background-color: red;
}
.color-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #fff;
  box-shadow: 1px 1px 1px #949494;
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
.current-color-stage {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: cell;
  box-shadow: 1px 1px 1px #949494;
  overflow: hidden;
}
.current-color {
  position: absolute;
  width: 100%;
  height: 100%;
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
  cursor: e-resize;
  box-shadow: 1px 1px 1px #949494;
}
.hue-bar {
  position: absolute;
  width: 100%;
  height: 100%;
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
.trans-bar {
  position: absolute;
  width: 100%;
  height: 100%;
}
.lucency {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("./lucency.png");
  background-repeat: repeat;
  background-size: 10px;
  background-position: 0 0;
}
/* controller-stage */
/* current-color-text-stage */
.current-color-text-stage {
  position: absolute;
  top: 290px;
}
/* current-color-text-stage */
</style>
