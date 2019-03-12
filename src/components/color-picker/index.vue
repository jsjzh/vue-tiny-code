<template>
  <div class="palette-pro-container">
    <div ref="dotStage" class="color-stage" title="拖动调节饱和度和明度">
      <div class="bgd current-bgd" :style="{'backgroundColor': pureColor}"/>
      <div class="bgd white-bgd"/>
      <div class="bgd black-bgd"/>
      <div ref="dot" class="color-dot" :style="{'left': `${satLeft}%`, 'top': `${valueTop}%`}"/>
    </div>

    <div class="controller-stage">
      <div class="current-color-stage" title="点击复制" @click="handleCopyColor(currentColor)">
        <div class="lucency"/>
        <div class="current-color" :style="{'backgroundColor': currentColor}"/>
      </div>
      <div class="controller-bars">
        <div ref="hueStage" class="bar hue-stage" title="拖动调节色相">
          <div class="hue-bar"/>
          <div ref="hue" class="slider" :style="{'left': `${hueLeft}%`}"/>
        </div>
        <div ref="transStage" class="bar trans-stage" title="拖动调节透明度">
          <div class="lucency"/>
          <div
            class="trans-bar"
            :style="{'backgroundImage': `linear-gradient(to right, rgba(255, 255, 255, 0), ${pureColor})`}"
          />
          <div ref="trans" class="slider" :style="{'left': `${transLeft}%`}"/>
        </div>
      </div>
      <div class="current-color-text-stage">
        <input
          disabled
          id="current-color-text"
          type="text"
          class="current-color-input"
          v-model="_currentColor"
        >
        <!-- <label for="current-color-text" class="current-color-label">切换</label> -->
      </div>
    </div>

    <div class="show-stage">
      <div class="show-toggle-stage flex-start-stage">
        <button
          class="show-toggle-btn"
          @click="(blendent = item.value, update())"
          v-for="item in blendents"
          :key="item.label"
        >{{item.label}}</button>
      </div>
      <div class="show-color-stage flex-start-stage">
        <div
          class="show-color-item"
          title="点击复制"
          @click="handleCopyColor(color)"
          v-for="(color, index) in showColors"
          :key="index"
          :style="{'backgroundColor': color}"
        />
      </div>
    </div>

    <div class="recom-stage flex-start-stage">
      <div
        class="recom-color-item"
        @click="handleSetColor(color)"
        v-for="(color, index) in recomColors"
        :key="index"
        :style="{'backgroundColor': color}"
      />
    </div>
  </div>
</template>


<script>
import drag from "@/utils/drag";
import paste from "@/utils/paste";
import Color from "./color";

export default {
  name: "color-picker",
  data() {
    const color = new Color({
      // 精度
      precision: 12 * 5
    });
    return {
      color,
      satLeft: 50,
      valueTop: 50,
      hueLeft: 50,
      transLeft: 50,
      pureColor: undefined,
      currentColor: undefined,
      showColors: undefined,
      blendent: undefined,
      recomColors: color.get("recomColors"),
      blendents: [
        { label: "互补色", value: "reverse" },
        { label: "近似色", value: "similar" },
        { label: "三角色", value: "triangle" },
        { label: "四角色", value: "square" },
        { label: "分裂互补色", value: "complement" },
        { label: "双分裂互补色", value: "doubleComplement" }
      ]
    };
  },
  computed: {
    _currentColor() {
      return this.currentColor;
    }
  },
  methods: {
    handleSetColor(color) {
      const { satLeft, valueTop, hueLeft, transLeft } = this.color.string2rate(
        color
      );
      this.satLeft = satLeft;
      this.valueTop = valueTop;
      this.hueLeft = hueLeft;
      this.transLeft = transLeft;
      this.update();
    },

    handleCopyColor(color) {
      paste(color);
    },

    update() {
      this.color._update(
        this.satLeft,
        this.valueTop,
        this.hueLeft,
        this.transLeft
      );
      this.showColors = this.color.blendent(this.blendent);
      this.currentColor = this.color.get("output");
      this.pureColor = this.color.get("pure");
    },

    handleDrag(event, elem) {
      const { hue, trans, dot } = this.$refs;
      const _className = elem.className;

      const { width, height, left, top } = elem.getBoundingClientRect();

      let _left = event.clientX - left;
      let _top = event.clientY - top;

      _left = _left > 0 ? Math.min(width, _left) : 0;
      _top = _top > 0 ? Math.min(height, _top) : 0;

      _className.indexOf("hue") !== -1
        ? (this.hueLeft = (_left / width) * 100)
        : _className.indexOf("trans") !== -1
        ? (this.transLeft = (_left / width) * 100)
        : _className.indexOf("color") !== -1
        ? ((this.satLeft = (_left / width) * 100),
          (this.valueTop = (_top / height) * 100))
        : "";

      this.update();
    }
  },
  mounted() {
    const { dotStage, hueStage, transStage } = this.$refs;

    [dotStage, hueStage, transStage].forEach(item => {
      drag(item, {
        start: (event, elem) => this.handleDrag(event, elem),
        move: (event, elem) => this.handleDrag(event, elem),
        end: (event, elem) => this.handleDrag(event, elem)
      });
    });

    this.update();
  }
};
</script>


<style lang="scss" scoped>
.palette-pro-container {
  width: 300px;
  background-color: #fff;
  box-shadow: 1px 1px 5px #949494;
  box-sizing: border-box;
  font-size: 1rem;
}
/* color-stage */
.color-stage {
  position: relative;
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
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 10px;
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
  background-image: url("~@/assets/img/palette/lucency.png");
  background-repeat: repeat;
  background-size: 10px;
  background-position: 0 0;
}
/* controller-stage */
/* current-color-text-stage */
.current-color-text-stage {
  margin-top: 20px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.current-color-input {
  border: 1px solid #949494;
  width: 70%;
  height: 10px;
  border-radius: 3px;
  padding: 8px;
}
/* current-color-text-stage */
/* show-stage */
.show-stage {
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.show-toggle-btn {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  padding: 5px;
  margin: 5px;
  border-radius: 3px;
  color: #fff;
  border: 1px solid #409eff;
  background-color: #409eff;
}
.flex-start-stage {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.show-color-item {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #949494;
  cursor: cell;
  margin: 5px;
}
/* show-stage */
/* recom-stage */
.recom-stage {
  padding: 10px;
}
.recom-color-item {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #949494;
  margin: 5px;
}
/* recom-stage */
</style>
