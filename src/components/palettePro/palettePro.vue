<template>
  <div class="palette-pro-container">
    <div class="color-stage">
      <div class="current-bgd"></div>
      <div class="white-bgd"></div>
      <div class="black-bgd"></div>
      <div class="color-dot">&#x2716;</div>
    </div>
    <div class="controller-stage">
      <div class="current-color"></div>
      <div class="controller-bars">
        <div class="hue-bar"></div>
        <div class="trans-bar"></div>
      </div>
    </div>
    <div class="current-color-text-stage">
      <div class="input-stage">
        <input type="text" class="current-color-text">
        <div class="color-type-toggle"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {};
</script>


<style scoped>
.palette-pro-container {
  position: absolute;
  width: 350px;
  height: 500px;
  top: 50%;
  left: 50%;
  background-color: #949494;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
/* color-stage */
.color-stage {
  position: absolute;
  width: 100%;
  height: 200px;
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
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
}
.controller-bars {
  width: 80%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.hue-bar {
  width: 100%;
  height: 20px;
  background-color: #eee;
  background: linear-gradient(
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
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), red);
}
/* controller-stage */
/* current-color-text-stage */
.current-color-text-stage {
  position: absolute;
  top: 290px;
}
/* current-color-text-stage */
</style>
