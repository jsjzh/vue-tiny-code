<template>
  <div id="saturation" class="saturation">
    <div id="bar" class="bar"></div>
  </div>
</template>


<script>
export default {
  mounted() {
    let _saturation = document.getElementById("saturation");
    let _bar = document.getElementById("bar");
    let _html = document.querySelector("html");

    _saturation.onmousedown = function(e) {
      let diffX = e.clientX - _bar.offsetLeft;
      _html.style.userSelect = "none";
      document.onmousemove = function(e) {
        let left = e.clientX - diffX;
        left = left < 1 ? 0 : left > 399 ? 400 : left;
        _bar.style.left = (left / _saturation.clientWidth) * 100 + "%";
        console.log(_bar.style.left);
      };

      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
        _html.style.userSelect = "auto";
      };
    };
  }
};
</script>

<style lang="scss" scoped>
$paletteWidth: 400px;
$paletteHeight: 25px;

.saturation {
  position: fixed;
  width: $paletteWidth;
  height: $paletteHeight;
  top: 50%;
  left: 50%;
  background-color: #eee;
  margin: (-($paletteHeight / 2)) (-($paletteWidth / 2));
  overflow: hidden;
}
.bar {
  position: absolute;
  width: 5px;
  background-color: red;
  height: 100%;
  top: 0%;
  left: 5%;
  transform: translateX(-2.5px);
  cursor: pointer;
}
.no-sl {
  user-select: none;
}
</style>

